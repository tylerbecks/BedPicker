import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const BedSection = ({ name, guests }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{name}</Text>
    {guests.map((guest, index) => (
      <View style={styles.item} key={index}>
        <Image style={styles.avatar} source={guest.photo} />
        <Text style={styles.itemText}>{guest.name}</Text>
      </View>
    ))}
  </View>
);

export default BedSection;

const AVATAR_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
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
