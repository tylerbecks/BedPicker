export default class GuestFetcher {
  constructor(sleepers) {
    this.sleepers = sleepers;
    this.index = 0;
  }

  getNextGuest() {
    const currentSleeper = this.getNextSleeper();
    if (!currentSleeper) {
      return null;
    }

    return currentSleeper.getGuest();
  }

  getNextSleeper() {
    const nextSleeper = this.sleepers[this.index];
    if (this.index >= this.sleepers.length) {
      return null;
    }

    if (nextSleeper.allAsigned()) {
      this.index++;
      return this.getNextSleeper();
    }

    return nextSleeper;
  }
}
