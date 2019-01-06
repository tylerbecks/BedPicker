import 'react-native';
import React from 'react';
import BedSection from '../BedSection';
import renderer from 'react-test-renderer';

it('renders when guests have photos', () => {
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

it('renders when guests have no photo', () => {
  const guests = [
    {
      name: 'foo',
      photo: null
    }
  ];

  expect(
    renderer.create(<BedSection name="baz" guests={guests} />).toJSON()
  ).toMatchSnapshot();
});
