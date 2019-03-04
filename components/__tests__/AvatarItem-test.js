import 'react-native';
import React from 'react';
import AvatarItem from '../AvatarItem';
import renderer from 'react-test-renderer';

it('renders when guests have photos', () => {
  expect(
    renderer.create(<AvatarItem text="baz" photo={{}} />).toJSON()
  ).toMatchSnapshot();
});
