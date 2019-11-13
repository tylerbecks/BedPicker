import _ from "lodash";
import { KING, QUEEN, FULL, TWIN } from "../constants/BedTypes";
import SleeperCouple from "./classes/SleeperCouple";
import GuestFetcher from "./classes/GuestFetcher";

const BED_SORT_WEIGHTS = {
  [KING]: 4,
  [QUEEN]: 3,
  [FULL]: 2,
  [TWIN]: 1
};

const unpackGuests = sleepers => {
  return _(sleepers)
    .map("guests")
    .flatten()
    .value();
};

export default class Assigner {
  constructor(sleepers, beds) {
    this.sleepers = sleepers;
    this.sortedBeds = Assigner.sortBeds(beds); // remove sorting
  }

  static getTotalBedCapacity(beds) {
    return _.sumBy(beds, "capacity");
  }

  static sortBeds(beds) {
    return beds
      .slice()
      .sort((a, b) => BED_SORT_WEIGHTS[b.type] - BED_SORT_WEIGHTS[a.type]);
  }

  static getSleepersWithSpot(sleepers, beds) {
    const sleepersWithSpot = [];
    let bedSpots = Assigner.getTotalBedCapacity(beds);

    // eslint-disable-next-line no-restricted-syntax
    for (const sleeper of sleepers) {
      if (bedSpots <= 0) {
        break;
      }
      const guestCount = sleeper.getUnassignedGuestCount();
      if (guestCount > bedSpots) {
        break;
      }
      sleepersWithSpot.push(sleeper);
      bedSpots -= guestCount;
    }

    return sleepersWithSpot;
  }

  static partitionGuestsByBedCapacity(sleepers, beds) {
    const sleepersCopy = sleepers.slice();
    const sleepersWithSpot = Assigner.getSleepersWithSpot(sleepersCopy, beds);
    const sleepersWithoutSpot = _.xor(sleepersWithSpot, sleepersCopy);

    return [sleepersWithSpot, sleepersWithoutSpot];
  }

  static getUnassignedGuestCount(sleepers) {
    return _.reduce(
      sleepers,
      (count, sleeper) => count + sleeper.getUnassignedGuestCount(),
      0
    );
  }

  static partitionSinglesCouples(sleepers) {
    return _.partition(sleepers, s => s instanceof SleeperCouple);
  }

  static partitionBedsByCapacity(beds) {
    return _.partition(beds, b => b.capacity > 1);
  }

  createAssignment() {
    const shuffledSleepers = _.shuffle(this.sleepers);
    const [
      sleepersWithBeds,
      sleepersWithoutBeds
    ] = Assigner.partitionGuestsByBedCapacity(
      shuffledSleepers,
      this.sortedBeds
    );

    const beds = this.assignCouplesAndSingles(sleepersWithBeds);
    const guestsWithoutBeds = unpackGuests(sleepersWithoutBeds);

    return { beds, guestsWithoutBeds, date: Date(Date.now()) };
  }

  assignCouplesAndSingles(sleepers) {
    const [sleeperCouples, sleeperSingles] = Assigner.partitionSinglesCouples(
      sleepers
    );
    const [doubleBeds, singleBeds] = Assigner.partitionBedsByCapacity(
      this.sortedBeds
    );
    const shuffledDoubleBeds = _.shuffle(doubleBeds);
    Assigner.fillBeds(sleeperCouples, shuffledDoubleBeds);

    const allSleepers = _.concat(sleeperCouples, sleeperSingles);
    const shuffledAllSleepers = _.shuffle(allSleepers);
    const allBedsSorted = Assigner.sortBeds(_.concat(doubleBeds, singleBeds));

    return Assigner.fillBeds(shuffledAllSleepers, allBedsSorted);
  }

  static fillBeds(sleepers, beds) {
    let remainingGuestCount = Assigner.getUnassignedGuestCount(sleepers);
    const guestFetcher = new GuestFetcher(sleepers);

    return _.map(beds, (bed, bedIndex) => {
      const remainingBedsCount = beds.length - bedIndex;
      if (bed.isFull()) {
        return bed;
      }

      if (remainingGuestCount === 0) {
        return bed;
      }

      if (remainingGuestCount <= remainingBedsCount) {
        // asign one guest per bed
        const guest = guestFetcher.getNextGuest();
        remainingGuestCount -= 1;
        bed.add(guest);
      } else {
        // fill bed
        while (!bed.isFull()) {
          const guest = guestFetcher.getNextGuest();
          // TODO maybe a bug here if no more we run out of guests
          remainingGuestCount -= 1;
          bed.add(guest);
        }
      }

      return bed;
    });
  }
}
