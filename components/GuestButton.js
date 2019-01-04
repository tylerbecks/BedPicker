import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import CircleButton, { BUTTON_SIZE } from './CircleButton';

const GuestButton = ({ guest, onPress, selected }) => (
  <CircleButton onPress={onPress}>
    {selected ? (
      <Image source={guest.photo} style={styles.image} resizeMode="contain" />
    ) : (
      <Text style={styles.text}>{guest.name}</Text>
    )}
  </CircleButton>
);

export default GuestButton;

const styles = StyleSheet.create({
  image: {
    borderRadius: BUTTON_SIZE / 2,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  }
});
