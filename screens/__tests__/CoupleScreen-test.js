import 'react-native';
import React from 'react';
import CoupleScreen from '../CoupleScreen';
import renderer from 'react-test-renderer';

const navigationStub = {
  getParam() {
    return [];
  }
};

it('renders', () => {
  expect(
    renderer.create(<CoupleScreen navigation={navigationStub} />).toJSON()
  ).toMatchSnapshot();
});
