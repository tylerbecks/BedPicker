import 'react-native';
import React from 'react';
import GuestButton from '../GuestButton';
import renderer from 'react-test-renderer';

it('renders with blue background when selected', () => {
  expect(
    renderer
      .create(<GuestButton guestName="foo" onPress={jest.fn()} selected />)
      .toJSON()
  ).toMatchSnapshot();
});

it('renders with gray background when not selected', () => {
  expect(
    renderer
      .create(
        <GuestButton guestName="foo" onPress={jest.fn()} selected={false} />
      )
      .toJSON()
  ).toMatchSnapshot();
});
