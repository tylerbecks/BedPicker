import _ from 'lodash';
import { KING, QUEEN, FULL, TWIN } from '../constants/BedTypes';

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
  _.reduce(sleepers, (count, sleeper) => (count += sleeper.guests.length), 0);
