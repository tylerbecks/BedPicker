import _ from 'lodash'
import { KING, QUEEN, FULL, TWIN } from '../constants/BedTypes'

const BED_CAPACITIES = {
  [KING]: 2,
  [QUEEN]: 2,
  [FULL]: 1,
  [TWIN]: 1
};

// TODO research if `set` will help here, instead of using an int called capacity
export default class Assigner {
  constructor(guests, beds) {
    this.guests = guests;
    this.sortedBeds = this.sortBeds(beds);
  }

  sortBeds(beds) {
    const BED_WEIGHTS = {
      [KING]: 4,
      [QUEEN]: 3,
      [FULL]: 2,
      [TWIN]: 1
    };

    return beds.sort((a, b) => BED_WEIGHTS[b.type] - BED_WEIGHTS[a.type]);
  }

  assign() {
    const result = [];
    const shuffledGuests = _.shuffle(this.guests);
    let currentBedIdx = 0;
    let currentBed = this.sortedBeds[currentBedIdx];
    let currentBedCapacity = BED_CAPACITIES[currentBed.type];

    for (let guest of shuffledGuests) {
      currentBed.guests.push(guest);
      currentBedCapacity--;
      if (currentBedCapacity < 1) {
        result.push(currentBed);
        currentBedIdx++;
        if (currentBedIdx >= this.sortedBeds.length) {
          break;
        }

        currentBed = this.sortedBeds[currentBedIdx];
        currentBedCapacity = BED_CAPACITIES[currentBed.type];
      }
    }

    return result;
  }
}
