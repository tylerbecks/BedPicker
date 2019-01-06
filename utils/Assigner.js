import _ from 'lodash';
import { KING, QUEEN, FULL, TWIN } from '../constants/BedTypes';

// for couples, make them an array, this will keep them together during the shuffle
// TODO: figure out how to keep them in same room/bed, putting them on an even number would work.
// e.g. ['tyler', ['josh', 'cheryl'], 'noah']

const BED_CAPACITIES = {
  [KING]: 2,
  [QUEEN]: 2,
  [FULL]: 1,
  [TWIN]: 1
};

const BED_WEIGHTS = {
  [KING]: 4,
  [QUEEN]: 3,
  [FULL]: 2,
  [TWIN]: 1
};

export default class Assigner {
  constructor(guests, beds) {
    this.guests = guests;
    this.sortedBeds = this.sortBeds(beds);
  }

  sortBeds(beds) {
    return beds
      .slice()
      .sort((a, b) => BED_WEIGHTS[b.type] - BED_WEIGHTS[a.type]);
  }

  createAssignment() {
    const shuffledGuests = _.shuffle(this.guests);
    const beds = this.fillBeds(shuffledGuests, this.sortedBeds);
    return { beds, date: Date() };
  }

  fillBeds(guests, beds) {
    let guestIndex = 0;
    return _.map(beds, (bed, bedIndex) => {
      const remainingGuestsCount = guests.length - guestIndex;
      const remainingBedsCount = beds.length - bedIndex;

      if (remainingGuestsCount === 0) {
        return bed;
      }

      bed = _.cloneDeep(bed);

      if (remainingGuestsCount <= remainingBedsCount) {
        // asign one person per bed
        bed.guests.push(guests[guestIndex]);
        guestIndex++;
      } else {
        // fill bed
        let bedCapacity = BED_CAPACITIES[bed.type];

        while (bedCapacity > 0) {
          bed.guests.push(guests[guestIndex]);
          guestIndex++;
          bedCapacity--;
        }
      }

      return bed;
    });
  }
}
