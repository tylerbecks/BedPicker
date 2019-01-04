import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const CircleButton = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default CircleButton;

export const BUTTON_SIZE = 90;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#CFD8DC',
    borderRadius: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    margin: 10,
    width: BUTTON_SIZE
  }
});
