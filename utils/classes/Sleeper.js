export default class Sleeper {
  constructor(...guests) {
    this.guests = guests;
    this.nextAssignedIndex = 0;
  }

  getGuest() {
    if (this.allAsigned()) {
      throw new Error("All guests already assigned");
    }
    const guest = this.guests[this.nextAssignedIndex];
    this.nextAssignedIndex += 1;

    return guest;
  }

  allAsigned() {
    return this.nextAssignedIndex >= this.guests.length;
  }

  getUnassignedGuestCount() {
    return this.guests.length - this.nextAssignedIndex;
  }
}
