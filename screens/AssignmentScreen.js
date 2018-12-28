import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GuestButton from '../components/GuestButton';

const DEFAULT_GUESTS = [
  'Aaron',
  'Cheryl',
  'Daniel',
  'Jeremy',
  'Josh',
  'Noah',
  'Raj',
  'Tyler'
];

export default class AssignmentScreen extends React.Component {
  state = {
    selectedGuests: [],
    guests: DEFAULT_GUESTS
  };

  onPressGuest = guestName => {
    // TODO
    this.setState({
      selectedGuests: _.concat(this.state.selectedGuests, guestName)
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.titleText}>Bed assignment:</Text>
          <View style={styles.buttonsContainer}>
            {this.state.guests.map(guest => (
              <GuestButton
                key={guest}
                guestName={guest}
                onPress={this.onPressGuest}
              />
            ))}
          </View>
          <Text style={styles.titleText}>
            {this.state.selectedGuests.join(', ')}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  titleText: {
    textAlign: 'center'
  }
});
