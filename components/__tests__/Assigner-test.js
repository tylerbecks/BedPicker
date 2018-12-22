import 'react-native'
import _ from 'lodash';
import sinon from 'sinon'
import Assigner from '../Assigner'

const sandbox = sinon.sandbox.create()

beforeEach(() => {
  sandbox.stub(_, 'shuffle').callsFake(a => a)
});

afterEach(() => {
  sandbox.restore();
});

const dummyBeds = [
  { type: 'twin', name: 'upstairs twin', guests: [] },
  { type: 'queen', name: 'master', guests: [] },
  { type: 'twin', name: 'upstairs twin', guests: [] },
  { type: 'full', name: 'upstairs full', guests: [] },
  { type: 'full', name: 'couch', guests: [] }
];

it('sorts beds with bigger beds first', () => {
  const assigner = new Assigner([], dummyBeds);
  const result = assigner.sortBeds(dummyBeds);
  expect(result).toEqual([
    { type: 'queen', name: 'master', guests: [] },
    { type: 'full', name: 'upstairs full', guests: [] },
    { type: 'full', name: 'couch', guests: [] },
    { type: 'twin', name: 'upstairs twin', guests: [] },
    { type: 'twin', name: 'upstairs twin', guests: [] },
  ]);
});

it('assigns beds correctly', () => {
  const dummyGuests = ['tyler', 'josh', 'cheryl', 'jeremy', 'noah', 'aaron'];
  const assigner = new Assigner(dummyGuests, dummyBeds);
  const result = assigner.assign();
  expect(result).toEqual([
    { type: 'queen', name: 'master', guests: ['tyler', 'josh'] },
    { type: 'full', name: 'upstairs full', guests: ['cheryl'] },
    { type: 'full', name: 'couch', guests: ['jeremy'] },
    { type: 'twin', name: 'upstairs twin', guests: ['noah'] },
    { type: 'twin', name: 'upstairs twin', guests: ['aaron'] },
  ]);
});

it('works when there are more people than beds', () => {

});

it('works when there are more beds than people', () => {
  
});
