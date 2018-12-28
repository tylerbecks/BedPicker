import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GuestButton = ({ guestName, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      onPress(guestName);
    }}
  >
    <Text style={styles.text}>{guestName}</Text>
  </TouchableOpacity>
);

export default GuestButton;

const BUTTON_SIZE = 90;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    padding: 10,
    width: BUTTON_SIZE,
    margin: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});
