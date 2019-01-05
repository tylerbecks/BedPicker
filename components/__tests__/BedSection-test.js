import 'react-native';
import React from 'react';
import BedSection from '../BedSection';
import renderer from 'react-test-renderer';

it('renders', () => {
  const guests = [
    {
      name: 'foo',
      photo: {}
    },
    {
      name: 'bar',
      photo: {}
    }
  ];

  expect(
    renderer.create(<BedSection name="baz" guests={guests} />).toJSON()
  ).toMatchSnapshot();
});
