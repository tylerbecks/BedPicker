import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CircleButton from './CircleButton';

const TextSelectButton = ({ text, onPress, selected }) => (
  <CircleButton onPress={onPress} style={selected ? styles.button : {}}>
    <Text
      style={
        selected ? { ...styles.text, ...styles.selectedText } : styles.text
      }
    >
      {text}
    </Text>
  </CircleButton>
);

export default TextSelectButton;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  selectedText: {
    color: 'white'
  },
  button: {
    backgroundColor: '#2196F3'
  }
});
