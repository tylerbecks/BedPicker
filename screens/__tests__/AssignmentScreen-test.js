import "react-native";
import React from "react";
import MockDate from "mockdate";
import AssignmentScreen from "../AssignmentScreen";
import renderer from "react-test-renderer";
import Sleeper from "../../utils/classes/Sleeper";

it("renders", () => {
  MockDate.set(1434319925275);

  const getParamMock = jest.fn();
  const sleeper1 = new Sleeper({ id: 1 });
  const sleeper2 = new Sleeper({ id: 2 });
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

  MockDate.reset();
});
