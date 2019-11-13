import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import JerryImage from "../assets/images/jerry.png";

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    marginLeft: 20
  },
  itemText: {
    fontSize: 14
  },
  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 10
  }
});

const AvatarItem = ({ photo, text }) => (
  <View style={styles.item}>
    <Image style={styles.avatar} source={photo || JerryImage} />
    <Text style={styles.itemText}>{text}</Text>
  </View>
);

export default AvatarItem;
