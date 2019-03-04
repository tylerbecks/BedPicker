import _ from 'lodash';
import { KING, QUEEN, FULL, TWIN } from '../constants/BedTypes';
import SleeperCouple from './classes/SleeperCouple';
import GuestFetcher from './classes/GuestFetcher';

const BED_SORT_WEIGHTS = {
  [KING]: 4,
  [QUEEN]: 3,
  [FULL]: 2,
  [TWIN]: 1
};

export default class Assigner {
  constructor(sleepers, beds) {
    this.sleepers = sleepers;
    this.sortedBeds = this.sortBeds(beds); // remove sorting
  }

  sortBeds(beds) {
    return beds
      .slice()
      .sort((a, b) => BED_SORT_WEIGHTS[b.type] - BED_SORT_WEIGHTS[a.type]);
  }

  createAssignment() {
    const shuffledSleepers = _.shuffle(this.sleepers);
    const [
      sleepersWithBeds,
      sleepersWithoutBeds
    ] = partitionGuestsByBedCapacity(shuffledSleepers, this.sortedBeds);

    const beds = this.assignCouplesAndSingles(sleepersWithBeds);
    const guestsWithoutBeds = unpackGuests(sleepersWithoutBeds);

    return { beds, guestsWithoutBeds, date: Date() };
  }

  assignCouplesAndSingles(sleepers) {
    const [sleeperCouples, sleeperSingles] = partitionSinglesCouples(sleepers);
    const [doubleBeds, singleBeds] = partitionBedsByCapacity(this.sortedBeds);
    const shuffledDoubleBeds = _.shuffle(doubleBeds);
    this.fillBeds(sleeperCouples, shuffledDoubleBeds);

    const allSleepers = _.concat(sleeperCouples, sleeperSingles);
    const shuffledAllSleepers = _.shuffle(allSleepers);
    const allBedsSorted = this.sortBeds(_.concat(doubleBeds, singleBeds));

    return this.fillBeds(shuffledAllSleepers, allBedsSorted);
  }

  fillBeds(sleepers, beds) {
    let remainingGuestCount = getUnassignedGuestCount(sleepers);
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
        remainingGuestCount--;
        bed.add(guest);
      } else {
        // fill bed
        while (!bed.isFull()) {
          const guest = guestFetcher.getNextGuest();
          // TODO maybe a bug here if no more we run out of guests
          remainingGuestCount--;
          bed.add(guest);
        }
      }

      return bed;
    });
  }
}

const getUnassignedGuestCount = sleepers =>
  _.reduce(
    sleepers,
    (count, sleeper) => (count += sleeper.getUnassignedGuestCount()),
    0
  );

// export only for testing
export const getTotalBedCapacity = beds => _.sumBy(beds, 'capacity');

// export only for testing
export const partitionGuestsByBedCapacity = (sleepers, beds) => {
  sleepers = sleepers.slice();
  const sleepersWithSpot = getSleepersWithSpot(sleepers, beds);
  const sleepersWithoutSpot = _.xor(sleepersWithSpot, sleepers);

  return [sleepersWithSpot, sleepersWithoutSpot];
};

const getSleepersWithSpot = (sleepers, beds) => {
  const sleepersWithSpot = [];
  let bedSpots = getTotalBedCapacity(beds);
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
};

export const partitionSinglesCouples = sleepers =>
  _.partition(sleepers, s => s instanceof SleeperCouple);

export const partitionBedsByCapacity = beds =>
  _.partition(beds, b => b.capacity > 1);

const unpackGuests = sleepers => {
  return _(sleepers)
    .map('guests')
    .flatten()
    .value();
};
