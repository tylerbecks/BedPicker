import 'react-native';
import React from 'react';
import CircleButton from '../CircleButton';
import renderer from 'react-test-renderer';

it('renders', () => {
  expect(
    renderer.create(<CircleButton onPress={jest.fn()} />).toJSON()
  ).toMatchSnapshot();
});
