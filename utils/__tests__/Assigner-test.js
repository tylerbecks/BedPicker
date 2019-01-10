import 'react-native';
import _ from 'lodash';
import Assigner, {
  partitionGuestsByBedCapacity,
  getTotalBedCapacity,
  partitionSinglesCouples
} from '../Assigner';
import Sleeper from '../classes/Sleeper';
import SleeperCouple from '../classes/SleeperCouple';
import Bed from '../classes/Bed';

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

describe('getTotalBedCapacity', () => {
  it('counts capacity of beds', () => {
    const count = getTotalBedCapacity([twinBed1, queenBed]);
    expect(count).toEqual(3);
  });

  it('works with an empty array', () => {
    const count = getTotalBedCapacity([]);
    expect(count).toEqual(0);
  });
});

describe('partitionGuestsByBedCapacity', () => {
  it('splits people if there are more sleepers than beds', () => {
    const sleepers = [sleeper1, sleeper2, sleeper3, sleeper4, sleeper5];
    const beds = [twinBed1, queenBed];
    const result = partitionGuestsByBedCapacity(sleepers, beds);
    expect(result[0]).toEqual([sleeper1, sleeper2, sleeper3]);
    expect(result[1]).toEqual([sleeper4, sleeper5]);
  });

  it('returns an empty second array if there are enough beds for everyone', () => {
    const sleepers = [sleeper1, sleeper2, sleeper3, sleeper4];
    const beds = [twinBed1, queenBed, twinBed2];
    const [withBeds, noBeds] = partitionGuestsByBedCapacity(sleepers, beds);
    expect(withBeds).toEqual([sleeper1, sleeper2, sleeper3, sleeper4]);
    expect(noBeds).toEqual([]);
  });

  it('returns an empty first array if there are no beds', () => {
    const sleepers = [sleeper1, sleeper2, sleeper3, sleeper4];
    const beds = [];
    const [withBeds, noBeds] = partitionGuestsByBedCapacity(sleepers, beds);
    expect(withBeds).toEqual([]);
    expect(noBeds).toEqual([sleeper1, sleeper2, sleeper3, sleeper4]);
  });

  it('works with a couple', () => {
    const couple = new SleeperCouple(guest3, guest4);
    const sleepers = [sleeper1, sleeper2, couple, sleeper5];
    const beds = [twinBed1, queenBed, twinBed2];
    const [withBeds, noBeds] = partitionGuestsByBedCapacity(sleepers, beds);
    expect(withBeds).toEqual([sleeper1, sleeper2, couple]);
    expect(noBeds).toEqual([sleeper5]);
  });

  it('leaves a bed empty if there are an odd number of spots and only couples', () => {
    const couple1 = new SleeperCouple(guest1, guest2);
    const couple2 = new SleeperCouple(guest3, guest4);
    const [withBeds, noBeds] = partitionGuestsByBedCapacity(
      [couple1, couple2],
      [twinBed1, twinBed2, fullBed]
    );
    expect(withBeds).toEqual([couple1]);
    expect(noBeds).toEqual([couple2]);
  });

  it('leaves a bed empty if the last bed is a single and the last possible sleeper is a couple', () => {
    const couple = new SleeperCouple(guest1, guest2);
    const sleepers = [sleeper3, sleeper4, sleeper5, couple, sleeper1];
    const beds = [queenBed, twinBed1, twinBed2];
    const [withBeds, noBeds] = partitionGuestsByBedCapacity(sleepers, beds);
    expect(withBeds).toEqual([sleeper3, sleeper4, sleeper5]);
    expect(noBeds).toEqual([couple, sleeper1]);
  });
});

describe('partitionSinglesCouples', () => {
  it('seperates singles and couples in their original order', () => {
    const couple1 = new SleeperCouple(guest1, guest2);
    const couple2 = new SleeperCouple(guest3, guest4);
    const result = partitionSinglesCouples([
      couple1,
      sleeper1,
      couple2,
      sleeper2
    ]);
    expect(result[0]).toEqual([couple1, couple2]);
    expect(result[1]).toEqual([sleeper1, sleeper2]);
  });

  it('works with empty array', () => {
    const result = partitionSinglesCouples([]);
    expect(result[0]).toEqual([]);
    expect(result[1]).toEqual([]);
  });

  it('works with only singles', () => {
    const result = partitionSinglesCouples([sleeper1, sleeper2]);
    expect(result[0]).toEqual([]);
    expect(result[1]).toEqual([sleeper1, sleeper2]);
  });
});

describe('sortBeds', () => {
  it('sorts beds with bigger beds first', () => {
    const assigner = new Assigner([], [twinBed1, queenBed, twinBed2, fullBed]);
    const result = assigner.sortBeds([twinBed1, queenBed, twinBed2, fullBed]);
    expect(result).toEqual([queenBed, fullBed, twinBed1, twinBed2]);
  });
});

describe('createAssignment', () => {
  it('assigns each person a spot when there is exactly one spot per person', () => {
    const sleepers = [sleeper1, sleeper2, sleeper3, sleeper4, sleeper5];
    const assigner = new Assigner(sleepers, [
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

  // it('assigns couples to the same bed, if there is a big bed', () => {
  //   const couple = new SleeperCouple(guest1, guest2);
  //   const dummySleepers = [sleeper3, couple];
  //   const assigner = new Assigner(dummySleepers, [twinBed1, queenBed]);
  //   const result = assigner.createAssignment();
  //   expect(result.beds).toEqual([
  //     Object.assign(_.cloneDeep(queenBed), { guests: [guest1, guest2] }),
  //     Object.assign(_.cloneDeep(twinBed1), { guests: [guest3] })
  //   ]);
  // });
});
