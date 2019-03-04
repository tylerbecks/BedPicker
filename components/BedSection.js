import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AvatarItem from './AvatarItem';

const BedSection = ({ name, guests }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{name}</Text>
    {guests.map(guest => (
      <AvatarItem key={guest.id} text={guest.name} photo={guest.photo} />
    ))}
  </View>
);

export default BedSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12
  }
});
