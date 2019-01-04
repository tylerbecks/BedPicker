import 'react-native';
import React from 'react';
import GuestSelectionScreen from '../GuestSelectionScreen';
import renderer from 'react-test-renderer';

it('renders', () => {
  expect(renderer.create(<GuestSelectionScreen />).toJSON()).toMatchSnapshot();
});
