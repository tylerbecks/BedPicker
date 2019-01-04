import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MultiAddModal from '../MultiAddModal';

it('renders', () => {
  expect(
    renderer
      .create(
        <MultiAddModal
          onSubmit={jest.fn()}
          close={jest.fn()}
          placeholder="foo"
          isVisible
        />
      )
      .toJSON()
  ).toMatchSnapshot();
});
