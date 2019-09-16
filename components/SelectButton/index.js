import React from 'react';
import PhotoSelectButton from './PhotoSelectButton';
import TextSelectButton from './TextSelectButton';

const SelectButton = ({ text, photo, onPress, selected }) =>
  photo ? (
    <PhotoSelectButton
      text={text}
      photo={photo}
      onPress={onPress}
      selected={selected}
    />
  ) : (
    <TextSelectButton text={text} onPress={onPress} selected={selected} />
  );

export default SelectButton;
