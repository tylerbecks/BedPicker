import { KING, QUEEN, FULL, TWIN } from "../../constants/BedTypes";

const CAPACITIES = {
  [KING]: 2,
  [QUEEN]: 2,
  [FULL]: 1,
  [TWIN]: 1
};

export default class Bed {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.guests = [];
    this.capacity = CAPACITIES[type];
  }

  add(guest) {
    if (this.isFull()) {
      throw new Error("No more room in this bed!");
    }

    this.guests.push(guest);
  }

  isFull() {
    return this.guests.length >= this.capacity;
  }
}
