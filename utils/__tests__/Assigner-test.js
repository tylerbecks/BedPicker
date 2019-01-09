import 'react-native';
import _ from 'lodash';
import Assigner from '../Assigner';
import Sleeper from '../classses/Sleeper';
import SleeperCouple from '../classses/SleeperCouple';
import Bed from '../classses/Bed';

_.shuffle = jest.fn(x => x);

let kingBed;
let queenBed;
let fullBed;
let twinBed1;
let twinBed2;

const guest1 = { name: 'guest1', photo: {} };
const guest2 = { name: 'guest2', photo: {} };
const guest3 = { name: 'guest3', photo: {} };
const guest4 = { name: 'guest4', photo: {} };
const guest5 = { name: 'guest5', photo: {} };

let sleeper1;
let sleeper2;
let sleeper3;
let sleeper4;
let sleeper5;

beforeEach(() => {
  kingBed = new Bed('king', 'foobar');
  queenBed = new Bed('queen', 'bar');
  fullBed = new Bed('full', 'qux');
  twinBed1 = new Bed('twin', 'foo');
  twinBed2 = new Bed('twin', 'baz');

  sleeper1 = new Sleeper(guest1);
  sleeper2 = new Sleeper(guest2);
  sleeper3 = new Sleeper(guest3);
  sleeper4 = new Sleeper(guest4);
  sleeper5 = new Sleeper(guest5);
});

it('sorts beds with bigger beds first', () => {
  const assigner = new Assigner([], [twinBed1, queenBed, twinBed2, fullBed]);
  const result = assigner.sortBeds([twinBed1, queenBed, twinBed2, fullBed]);
  expect(result).toEqual([queenBed, fullBed, twinBed1, twinBed2]);
});

it('assigns each person a spot when there is exactly one spot per person', () => {
  const dummySleepers = [sleeper1, sleeper2, sleeper3, sleeper4, sleeper5];
  const assigner = new Assigner(dummySleepers, [
    twinBed1,
    queenBed,
    twinBed2,
    fullBed
  ]);
  const result = assigner.createAssignment();

  expect(result.beds).toEqual([
    Object.assign(_.cloneDeep(queenBed), { guests: [guest1, guest2] }),
    Object.assign(_.cloneDeep(fullBed), { guests: [guest3] }),
    Object.assign(_.cloneDeep(twinBed1), { guests: [guest4] }),
    Object.assign(_.cloneDeep(twinBed2), { guests: [guest5] })
  ]);
});

it('works when there are more people than beds', () => {
  const dummySleepers = [sleeper1, sleeper2, sleeper3];
  const assigner = new Assigner(dummySleepers, [twinBed1]);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    Object.assign(_.cloneDeep(twinBed1), { guests: [guest1] })
  ]);
});

it('assigns everyone their own bed when there are more beds than people', () => {
  const dummySleepers = [sleeper1, sleeper2, sleeper3];
  const assigner = new Assigner(dummySleepers, [
    twinBed1,
    queenBed,
    twinBed2,
    fullBed
  ]);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    Object.assign(_.cloneDeep(queenBed), { guests: [guest1] }),
    Object.assign(_.cloneDeep(fullBed), { guests: [guest2] }),
    Object.assign(_.cloneDeep(twinBed1), { guests: [guest3] }),
    twinBed2
  ]);
});

it('assigns as many people their own bed as possible', () => {
  const dummySleepers = [sleeper1, sleeper2, sleeper3, sleeper4];
  const queenBed2 = new Bed('queen', 'barFoo');
  const bigBeds = [kingBed, queenBed, queenBed2];
  const assigner = new Assigner(dummySleepers, bigBeds);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    Object.assign(_.cloneDeep(kingBed), { guests: [guest1, guest2] }),
    Object.assign(_.cloneDeep(queenBed), { guests: [guest3] }),
    Object.assign(_.cloneDeep(queenBed2), { guests: [guest4] })
  ]);
});

it('works with a couple', () => {
  const couple = new SleeperCouple(guest1, guest2);
  const dummySleepers = [couple, sleeper3];
  const assigner = new Assigner(dummySleepers, [twinBed1, queenBed]);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    Object.assign(_.cloneDeep(queenBed), { guests: [guest1, guest2] }),
    Object.assign(_.cloneDeep(twinBed1), { guests: [guest3] })
  ]);
});
