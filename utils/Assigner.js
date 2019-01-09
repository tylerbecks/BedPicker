import _ from 'lodash';
import { KING, QUEEN, FULL, TWIN } from '../constants/BedTypes';

// for couples, make them an array, this will keep them together during the shuffle
// TODO: figure out how to keep them in same room/bed, putting them on an even number would work.
// e.g. ['tyler', ['josh', 'cheryl'], 'noah']

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
    return _.map(beds, (bed, bedIndex) => {
      const remainingSleepersCount = sleepers.length - this.currentSleeperIndex;
      const remainingBedsCount = beds.length - bedIndex;

      if (remainingSleepersCount === 0) {
        return bed;
      }

      if (remainingSleepersCount <= remainingBedsCount) {
        // asign one guest per bed
        const guest = this.getNextGuest();
        bed.add(guest);
      } else {
        // fill bed
        while (!bed.isFull()) {
          const guest = this.getNextGuest();
          bed.add(guest);
        }
      }

      return bed;
    });
  }

  getNextGuest = () => {
    const currentSleeper = this.sleepers[this.currentSleeperIndex];
    const nextGuest = currentSleeper.getGuest();

    if (currentSleeper.allAsigned()) {
      this.currentSleeperIndex++;
    }

    return nextGuest;
  };
}
