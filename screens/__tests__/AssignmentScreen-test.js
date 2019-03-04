import 'react-native';
import React from 'react';
import AssignmentScreen from '../AssignmentScreen';
import renderer from 'react-test-renderer';
import Sleeper from '../../utils/classes/Sleeper';

it('renders', () => {
  const getParamMock = jest.fn();
  const sleeper1 = new Sleeper({});
  const sleeper2 = new Sleeper({});
  getParamMock.mockReturnValue([sleeper1, sleeper2]);

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
