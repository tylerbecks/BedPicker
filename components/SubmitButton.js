import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#21ba45",
    borderRadius: 100,
    justifyContent: "center",
    padding: 10,
    height: 80,
    margin: 10
  },
  disabled: {
    opacity: 0.4
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  }
});

const SubmitButton = ({ onPress, disabled, text }) => (
  <TouchableOpacity
    activeOpacity={disabled ? 1 : 0.7}
    style={disabled ? { ...styles.button, ...styles.disabled } : styles.button}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default SubmitButton;
