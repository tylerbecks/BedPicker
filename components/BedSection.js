import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

const BedSection = ({ type, name, guests }) => (
  <Card title={name}>
    <View>
      {guests.map((guest, index) => (
        <ListItem
          key={index}
          title={guest.name}
          leftAvatar={{ source: guest.photo }}
        />
      ))}
    </View>
  </Card>
);

export default BedSection;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24
  }
});
