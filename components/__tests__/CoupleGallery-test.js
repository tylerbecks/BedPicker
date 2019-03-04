import 'react-native';
import React from 'react';
import CoupleGallery from '../CoupleGallery';
import renderer from 'react-test-renderer';

it('renders', () => {
  const guest1 = { id: 1, name: 'foo' };
  const guest2 = { id: 2, name: 'bar' };
  expect(
    renderer.create(<CoupleGallery couples={[[guest1, guest2]]} />).toJSON()
  ).toMatchSnapshot();
});
