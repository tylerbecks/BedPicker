import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CoupleGallery = ({ couples }) => (
  <View style={styles.container}>
    {couples.map(([partner1, partner2]) => (
      <View style={styles.couple} key={partner1.id}>
        <Image
          style={{ ...styles.circle, ...styles.firstImage }}
          source={partner1.photo}
        />
        <Image
          style={{ ...styles.circle, ...styles.secondImage }}
          source={partner2.photo}
        />
      </View>
    ))}
  </View>
);

export default CoupleGallery;

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20
  },
  couple: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#CFD8DC',
    borderColor: 'black',
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
  }
});
