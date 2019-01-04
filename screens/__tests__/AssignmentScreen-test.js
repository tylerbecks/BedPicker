import 'react-native';
import React from 'react';
import AssignmentScreen from '../AssignmentScreen';
import renderer from 'react-test-renderer';

it('renders', () => {
  const getParamMock = jest.fn();
  getParamMock.mockReturnValue(['foo', 'bar', 'baz']);

  expect(
    renderer
      .create(
        <AssignmentScreen
          navigation={{
            getParam: getParamMock
          }}
        />
      )
      .toJSON()
  ).toMatchSnapshot();
});
