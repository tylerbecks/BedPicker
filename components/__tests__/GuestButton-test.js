import 'react-native';
import React from 'react';
import GuestButton from '../GuestButton';
import renderer from 'react-test-renderer';

const guest = { name: 'foo', photo: {} };

it('renders with guest name when selected', () => {
  expect(
    renderer
      .create(<GuestButton guest={guest} onPress={jest.fn()} selected />)
      .toJSON()
  ).toMatchSnapshot();
});

it('renders with image when not selected', () => {
  expect(
    renderer
      .create(
        <GuestButton guest={guest} onPress={jest.fn()} selected={false} />
      )
      .toJSON()
  ).toMatchSnapshot();
});
