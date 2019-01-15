import GuestFetcher from '../GuestFetcher';
import Sleeper from '../Sleeper';
import SleeperCouple from '../SleeperCouple';

const guest1 = { name: 'guest1', photo: {} };
const guest2 = { name: 'guest2', photo: {} };
const guest3 = { name: 'guest3', photo: {} };
const guest4 = { name: 'guest4', photo: {} };

let sleeper1;
let couple;
let sleeper4;

beforeEach(() => {
  sleeper1 = new Sleeper(guest1);
  couple = new SleeperCouple(guest2, guest3);
  sleeper4 = new Sleeper(guest4);
});

describe('getNextGuest', () => {
  it('fetches guests in their provided order', () => {
    const sleepers = [sleeper1, couple, sleeper4];
    const guestFetcher = new GuestFetcher(sleepers);
    const first = guestFetcher.getNextGuest();
    expect(first).toEqual(guest1);

    const second = guestFetcher.getNextGuest();
    expect(second).toEqual(guest2);

    const third = guestFetcher.getNextGuest();
    expect(third).toEqual(guest3);

    const fourth = guestFetcher.getNextGuest();
    expect(fourth).toEqual(guest4);
  });

  it('skips over assigned guests', () => {
    sleeper1.getGuest();
    couple.getGuest();
    const sleepers = [sleeper1, couple, sleeper4];
    const guestFetcher = new GuestFetcher(sleepers);

    const next = guestFetcher.getNextGuest();
    expect(next).toEqual(guest3);
  });

  it('returns null if last sleeper is all assigned', () => {
    sleeper4.getGuest();
    const sleepers = [sleeper1, sleeper4];
    const guestFetcher = new GuestFetcher(sleepers);

    const first = guestFetcher.getNextGuest();
    expect(first).toEqual(guest1);

    const second = guestFetcher.getNextGuest();
    expect(second).toEqual(null);
  });

  it('returns null if provided an empty array', () => {
    const guestFetcher = new GuestFetcher([]);
    const next = guestFetcher.getNextGuest();
    expect(next).toEqual(null);
  });
});
