import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import TextSelectButton from "../TextSelectButton";

it("renders", () => {
  expect(
    renderer
      .create(<TextSelectButton text="foo" onPress={jest.fn()} selected />)
      .toJSON()
  ).toMatchSnapshot();
});
