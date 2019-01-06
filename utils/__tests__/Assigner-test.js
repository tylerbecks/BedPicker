import 'react-native';
import _ from 'lodash';
import Assigner from '../Assigner';

_.shuffle = jest.fn(x => x);

const dummyBeds = [
  { type: 'twin', name: 'foo', guests: [] },
  { type: 'queen', name: 'bar', guests: [] },
  { type: 'twin', name: 'baz', guests: [] },
  { type: 'full', name: 'qux', guests: [] },
  { type: 'full', name: 'quux', guests: [] }
];

it('sorts beds with bigger beds first', () => {
  const assigner = new Assigner([], dummyBeds);
  const result = assigner.sortBeds(dummyBeds);
  expect(result).toEqual([
    { type: 'queen', name: 'bar', guests: [] },
    { type: 'full', name: 'qux', guests: [] },
    { type: 'full', name: 'quux', guests: [] },
    { type: 'twin', name: 'foo', guests: [] },
    { type: 'twin', name: 'baz', guests: [] }
  ]);
});

it('assigns each person a spot when there is exactly one spot per person', () => {
  const dummyGuests = ['tyler', 'josh', 'cheryl', 'jeremy', 'noah', 'aaron'];
  const assigner = new Assigner(dummyGuests, dummyBeds);
  const result = assigner.assignBeds();
  expect(result.beds).toEqual([
    { type: 'queen', name: 'bar', guests: ['tyler', 'josh'] },
    { type: 'full', name: 'qux', guests: ['cheryl'] },
    { type: 'full', name: 'quux', guests: ['jeremy'] },
    { type: 'twin', name: 'foo', guests: ['noah'] },
    { type: 'twin', name: 'baz', guests: ['aaron'] }
  ]);
});

it('works when there are more people than beds', () => {
  const dummyGuests = ['tyler', 'josh', 'cheryl'];
  const lessBeds = [{ type: 'twin', name: 'foo', guests: [] }];
  const assigner = new Assigner(dummyGuests, lessBeds);
  const result = assigner.assignBeds();
  expect(result.beds).toEqual([
    { type: 'twin', name: 'foo', guests: ['tyler'] }
  ]);
});

it('assigns everyone their own bed when there are more beds than people', () => {
  const dummyGuests = ['tyler', 'josh', 'cheryl'];
  const assigner = new Assigner(dummyGuests, dummyBeds);
  const result = assigner.assignBeds();
  expect(result.beds).toEqual([
    { type: 'queen', name: 'bar', guests: ['tyler'] },
    { type: 'full', name: 'qux', guests: ['josh'] },
    { type: 'full', name: 'quux', guests: ['cheryl'] },
    { type: 'twin', name: 'foo', guests: [] },
    { type: 'twin', name: 'baz', guests: [] }
  ]);
});
