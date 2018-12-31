import 'react-native';
import React from 'react';
import SubmitButton from '../SubmitButton';
import renderer from 'react-test-renderer';

it('renders with blue background when selected', () => {
  expect(
    renderer.create(<SubmitButton onPress={jest.fn()} />).toJSON()
  ).toMatchSnapshot();
});
