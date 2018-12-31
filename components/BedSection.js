import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

const BedSection = ({ type, name, guests }) => (
  <Card title={name}>
    <View>
      {guests.map((guest, index) => (
        <ListItem
          key={index}
          // roundAvatar
          title={guest}
          // avatar={{ uri: u.avatar }}
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
