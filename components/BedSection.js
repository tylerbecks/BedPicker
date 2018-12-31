import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BedSection = ({ type, name, guests }) => (
  <View>
    <Text style={styles.title}>{type}</Text>
    <Text>{name}</Text>
    {guests.map(guest => (
      <Text>{guest}</Text>
    ))}
  </View>
);

export default BedSection;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24
  }
});
