export default class Sleeper {
  constructor(...guests) {
    this.guests = guests;
    this.nextAssignedIndex = 0;
  }

  getGuest = () => {
    if (this.allAsigned()) {
      throw new Error('All guests already assigned');
    }
    const guest = this.guests[this.nextAssignedIndex];
    this.nextAssignedIndex++;
    return guest;
  };

  allAsigned = () => this.nextAssignedIndex >= this.guests.length;

  getUnassignedGuestCount = () => this.guests.length - this.nextAssignedIndex;
}
