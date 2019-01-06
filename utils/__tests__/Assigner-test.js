import 'react-native';
import _ from 'lodash';
import Assigner from '../Assigner';

_.shuffle = jest.fn(x => x);

const dummyBeds = [
  { type: 'twin', name: 'foo', guests: [] },
  { type: 'queen', name: 'bar', guests: [] },
  { type: 'twin', name: 'baz', guests: [] },
  { type: 'full', name: 'qux', guests: [] }
];

const guest1 = { name: 'guest1', photo: {} };
const guest2 = { name: 'guest2', photo: {} };
const guest3 = { name: 'guest3', photo: {} };
const guest4 = { name: 'guest4', photo: {} };
const guest5 = { name: 'guest5', photo: {} };

it('sorts beds with bigger beds first', () => {
  const assigner = new Assigner([], dummyBeds);
  const result = assigner.sortBeds(dummyBeds);
  expect(result).toEqual([
    { type: 'queen', name: 'bar', guests: [] },
    { type: 'full', name: 'qux', guests: [] },
    { type: 'twin', name: 'foo', guests: [] },
    { type: 'twin', name: 'baz', guests: [] }
  ]);
});

it('assigns each person a spot when there is exactly one spot per person', () => {
  const dummyGuests = [guest1, guest2, guest3, guest4, guest5];
  const assigner = new Assigner(dummyGuests, dummyBeds);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    { type: 'queen', name: 'bar', guests: [guest1, guest2] },
    { type: 'full', name: 'qux', guests: [guest3] },
    { type: 'twin', name: 'foo', guests: [guest4] },
    { type: 'twin', name: 'baz', guests: [guest5] }
  ]);
});

it('works when there are more people than beds', () => {
  const dummyGuests = [guest1, guest2, guest3];
  const oneBed = [{ type: 'twin', name: 'haha', guests: [] }];
  const assigner = new Assigner(dummyGuests, oneBed);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    { type: 'twin', name: 'haha', guests: [guest1] }
  ]);
});

it('assigns everyone their own bed when there are more beds than people', () => {
  const dummyGuests = [guest1, guest2, guest3];
  const assigner = new Assigner(dummyGuests, dummyBeds);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    { type: 'queen', name: 'bar', guests: [guest1] },
    { type: 'full', name: 'qux', guests: [guest2] },
    { type: 'twin', name: 'foo', guests: [guest3] },
    { type: 'twin', name: 'baz', guests: [] }
  ]);
});

it('assigns as many people their own bed as possible', () => {
  const dummyGuests = [guest1, guest2, guest3, guest4];
  const bigBeds = [
    { type: 'king', name: 'foo', guests: [] },
    { type: 'queen', name: 'bar', guests: [] },
    { type: 'queen', name: 'baz', guests: [] }
  ];
  const assigner = new Assigner(dummyGuests, bigBeds);
  const result = assigner.createAssignment();
  expect(result.beds).toEqual([
    { type: 'king', name: 'foo', guests: [guest1, guest2] },
    { type: 'queen', name: 'bar', guests: [guest3] },
    { type: 'queen', name: 'baz', guests: [guest4] }
  ]);
});
