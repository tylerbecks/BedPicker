import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export const BUTTON_SIZE = 90;

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    backgroundColor: "#CFD8DC",
    borderRadius: BUTTON_SIZE,
    elevation: 2, // Android
    height: BUTTON_SIZE,
    justifyContent: "center",
    margin: 10,
    shadowColor: "rgba(0,0,0, .4)", // iOS
    shadowOffset: { height: 1, width: 1 }, // iOS
    shadowOpacity: 1, // iOS
    shadowRadius: 1, // iOS
    width: BUTTON_SIZE
  }
});

const CircleButton = ({ onPress, children, style }) => (
  <TouchableOpacity
    activeOpacity={0.4}
    style={{ ...styles.circle, ...style }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export default CircleButton;
