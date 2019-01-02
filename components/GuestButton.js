import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const GuestButton = ({ guest, onPress, selected }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {selected ? (
      <Image source={guest.photo} style={styles.image} resizeMode="contain" />
    ) : (
      <Text style={styles.text}>{guest.name}</Text>
    )}
  </TouchableOpacity>
);

export default GuestButton;

const BUTTON_SIZE = 90;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#CFD8DC',
    borderRadius: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    margin: 10,
    width: BUTTON_SIZE
  },
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
