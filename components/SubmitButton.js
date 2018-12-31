import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SubmitButton = ({ onPress, disabled }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
    <Text style={styles.text}>Submit</Text>
  </TouchableOpacity>
);

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#43A047',
    borderRadius: 100,
    justifyContent: 'center',
    padding: 10,
    height: 80,
    margin: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});
