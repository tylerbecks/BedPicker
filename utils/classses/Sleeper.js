export default class Sleeper {
  constructor(...guests) {
    this.guests = guests;
    this.nextAssignedIndex = 0;
  }

  getGuest = () => {
    const guest = this.guests[this.nextAssignedIndex];
    this.nextAssignedIndex++;
    return guest;
  };

  allAsigned = () => this.nextAssignedIndex >= this.guests.length;
}
