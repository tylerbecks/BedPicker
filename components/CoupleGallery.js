import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap"
  },
  couple: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10
  },
  circle: {
    alignItems: "center",
    backgroundColor: "#CFD8DC",
    borderColor: "black",
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    height: AVATAR_SIZE,
    width: AVATAR_SIZE
  },
  firstImage: {
    zIndex: 2
  },
  secondImage: {
    marginLeft: -7,
    zIndex: 1
  },
  textContainer: {
    backgroundColor: "#2196F3",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  }
});

const getFirstInitial = name => name.charAt(0);

const CoupleGallery = ({ couples }) => (
  <View style={styles.container}>
    {couples.map(([partner1, partner2]) => (
      <View style={styles.couple} key={partner1.id}>
        <ImageOrTextCircle
          style={{ ...styles.circle, ...styles.firstImage }}
          guest={partner1}
        />
        <ImageOrTextCircle
          style={{ ...styles.circle, ...styles.secondImage }}
          guest={partner2}
        />
      </View>
    ))}
  </View>
);

const ImageOrTextCircle = ({ style, guest }) =>
  guest.photo ? (
    <Image style={style} source={guest.photo} />
  ) : (
    <View style={{ ...style, ...styles.textContainer }}>
      <Text style={styles.text}>{getFirstInitial(guest.name)}</Text>
    </View>
  );

export default CoupleGallery;
