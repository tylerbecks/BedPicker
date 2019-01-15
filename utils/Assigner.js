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
    const beds = this.fillBeds(shuffledSleepers, this.sortedBeds);
    return { beds, date: Date() };
  }

  fillBeds2() {
    const shuffledSleepers = _.shuffle(this.sleepers);
    const [
      sleepersWithBeds,
      sleepersWithoutBeds
    ] = partitionGuestsByBedCapacity(this.sortedBeds, shuffledSleepers);
    const [sleeperCouples, sleeperSingles] = partitionSinglesCouples(
      sleepersWithBeds
    );
    const [doubleBeds, singleBeds] = partitionBedsByCapacity(this.sortedBeds);
    const shuffledDoubleBeds = _.shuffle(doubleBeds);
    const doubleBedsWithCouples = this.fillBeds(
      sleeperCouples,
      shuffledDoubleBeds
    );
    const allSleepersWithBeds = _.concat(sleeperCouples, sleeperSingles);
    const shuffledAllSleepersWithBeds = _.shuffle(allSleepersWithBeds);
    const allBedsSorted = this.sortBeds(_.concat(doubleBeds, singleBeds));
    // procede with function below
  }

  fillBeds(sleepers, beds) {
    let remainingGuestCount = getGuestCount(sleepers);
    const guestFetcher = new GuestFetcher(sleepers);

    return _.map(beds, (bed, bedIndex) => {
      const remainingBedsCount = beds.length - bedIndex;

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

const getGuestCount = sleepers =>
  _.reduce(sleepers, (count, sleeper) => (count += sleeper.getGuestCount()), 0);

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
    const guestCount = sleeper.getGuestCount();
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
