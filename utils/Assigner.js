import _ from 'lodash';
import { KING, QUEEN, FULL, TWIN } from '../constants/BedTypes';
import SleeperCouple from './classes/SleeperCouple';

const BED_SORT_WEIGHTS = {
  [KING]: 4,
  [QUEEN]: 3,
  [FULL]: 2,
  [TWIN]: 1
};

export default class Assigner {
  constructor(sleepers, beds) {
    this.sleepers = sleepers;
    this.sortedBeds = this.sortBeds(beds);
    this.currentSleeperIndex = 0;
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
    // split beds by doubles and singles
    // shuffle double beds
    // assign as many couples into double beds as possible
    // combine remaining sleeper arrays
    // combine and sort remaining beds arrays
    // procede with function below
  }

  fillBeds(sleepers, beds) {
    let remainingGuestCount = getGuestCount(sleepers);

    return _.map(beds, (bed, bedIndex) => {
      const remainingBedsCount = beds.length - bedIndex;

      if (remainingGuestCount === 0) {
        return bed;
      }

      if (remainingGuestCount <= remainingBedsCount) {
        // asign one guest per bed
        const guest = this.getNextGuest(sleepers);
        remainingGuestCount--;
        bed.add(guest);
      } else {
        // fill bed
        while (!bed.isFull()) {
          const guest = this.getNextGuest(sleepers);
          remainingGuestCount--;
          bed.add(guest);
        }
      }

      return bed;
    });
  }

  getNextGuest = sleepers => {
    const currentSleeper = sleepers[this.currentSleeperIndex];
    const nextGuest = currentSleeper.getGuest();

    if (currentSleeper.allAsigned()) {
      this.currentSleeperIndex++;
    }

    return nextGuest;
  };
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
