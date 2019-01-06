import 'react-native';
import React from 'react';
import PhotoSelectButton from '../PhotoSelectButton';
import renderer from 'react-test-renderer';

it('renders with guest name when selected', () => {
  expect(
    renderer
      .create(
        <PhotoSelectButton text="foo" photo={{}} onPress={jest.fn()} selected />
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders with image when not selected', () => {
  expect(
    renderer
      .create(
        <PhotoSelectButton
          text="foo"
          photo={{}}
          onPress={jest.fn()}
          selected={false}
        />
      )
      .toJSON()
  ).toMatchSnapshot();
});
