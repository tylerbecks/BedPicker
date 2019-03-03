import 'react-native';
import _ from 'lodash';
import convertGuestsToSleepers from '../convertGuestsToSleepers';
import Sleeper from '../classes/Sleeper';
import SleeperCouple from '../classes/SleeperCouple';

const guest1 = { id: '1' };
const guest2 = { id: '2' };
const guest3 = { id: '3' };
const guest4 = { id: '4' };
const guests = [guest1, guest2, guest3, guest4];

describe('convertGuestsToSleepers', () => {
  it('converts all guests to SleeperCouples when all guests are coupled', () => {
    const coupledGuestsIdMap = { 1: '2', 3: '4' };
    const sleepers = convertGuestsToSleepers(guests, coupledGuestsIdMap);

    const expectedCouple1 = new SleeperCouple(guest1, guest2);
    const expectedCouple2 = new SleeperCouple(guest3, guest4);
    // must use JSON.stringify because toEqual fails on comparing methods on objects
    expect(JSON.stringify(sleepers)).toEqual(
      JSON.stringify([expectedCouple1, expectedCouple2])
    );
  });

  it('converts all guests to Sleepers when no guests are coupled', () => {
    const coupledGuestsIdMap = {};
    const sleepers = convertGuestsToSleepers(guests, coupledGuestsIdMap);

    expect(JSON.stringify(sleepers)).toEqual(
      JSON.stringify([
        new Sleeper(guest1),
        new Sleeper(guest2),
        new Sleeper(guest3),
        new Sleeper(guest4)
      ])
    );
  });

  it('converts some guests to Sleepers and some to SleeperCouples when some guests are coupled', () => {
    const coupledGuestsIdMap = { 3: '4' };
    const sleepers = convertGuestsToSleepers(guests, coupledGuestsIdMap);

    const expectedCouple1 = new SleeperCouple(guest3, guest4);
    expect(JSON.stringify(sleepers)).toEqual(
      JSON.stringify([
        expectedCouple1,
        new Sleeper(guest1),
        new Sleeper(guest2)
      ])
    );
  });

  it('works with non-empty map and empty guests array', () => {
    const coupledGuestsIdMap = { 3: '4' };
    expect(() => {
      convertGuestsToSleepers([], coupledGuestsIdMap);
    }).toThrow();
  });
});
