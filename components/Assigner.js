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
    return beds.slice().sort((a, b) => BED_WEIGHTS[b.type] - BED_WEIGHTS[a.type]);
  }

  assign() {
    const shuffledGuests = _.shuffle(this.guests);
    if (this.guests.length <= this.sortedBeds.length) {
      return this.assignOnePersonPerBed(shuffledGuests);
    } else {
      return this.fillBeds(shuffledGuests);
    }
  }

  assignOnePersonPerBed(guests) {
    return _.map(this.sortedBeds, (bed, index) => {
      if (index >= guests.length) {
        return bed;
      }
      const currentGuest = guests[index]

      return Object.assign({}, bed, {
        guests: [currentGuest]
      })
    })
  }

  fillBeds(guests) {
    if (guests.length < this.sortedBeds.length) {
      throw Error('expected more beds than peole, use assignOnePersonPerBed')
    }

    let guestIndex = 0;
    return _.map(this.sortedBeds, (bed) => {
      let bedCapacity = BED_CAPACITIES[bed.type];
      bed = _.cloneDeep(bed)
      while (bedCapacity > 0) {
        bed.guests.push(guests[guestIndex])
        guestIndex++
        bedCapacity--
      }
      return bed;
    })
  }
}
