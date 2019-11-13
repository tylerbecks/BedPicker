import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import CircleButton, { BUTTON_SIZE } from "../CircleButton";

const styles = StyleSheet.create({
  image: {
    borderRadius: BUTTON_SIZE / 2,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE
  },
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
});

const PhotoSelectButton = ({ text, photo, onPress, selected }) => (
  <CircleButton onPress={onPress}>
    {selected ? (
      <Image source={photo} style={styles.image} resizeMode="contain" />
    ) : (
      <Text style={styles.text}>{text}</Text>
    )}
  </CircleButton>
);

export default PhotoSelectButton;
