import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const GuestButton = ({ guestName, onPress, selected }) => (
  <TouchableOpacity
    style={
      selected ? { ...styles.button, ...styles.selectedButton } : styles.button
    }
    onPress={() => {
      onPress(guestName);
    }}
  >
    <Text
      style={
        selected ? { ...styles.text, ...styles.selectedText } : styles.text
      }
    >
      {guestName}
    </Text>
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
    padding: 10,
    width: BUTTON_SIZE,
    margin: 10
  },
  selectedButton: {
    backgroundColor: 'blue'
  },
  selectedText: {
    color: 'white'
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  }
});
