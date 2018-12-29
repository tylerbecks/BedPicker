import 'react-native';
import React from 'react';
import AssignmentScreen from '../AssignmentScreen';
import renderer from 'react-test-renderer';

it('renders', () => {
  expect(renderer.create(<AssignmentScreen />).toJSON()).toMatchSnapshot();
});
