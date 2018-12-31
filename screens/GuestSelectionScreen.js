import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GuestButton from '../components/GuestButton';
import SubmitButton from '../components/SubmitButton';

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
    guests: DEFAULT_GUESTS,
    assignment: null
  };

  onPressGuest = guestName => {
    const selectedGuests = this.state.selectedGuests.includes(guestName)
      ? _.without(this.state.selectedGuests, guestName)
      : _.concat(this.state.selectedGuests, guestName);

    this.setState({ selectedGuests });
  };

  onSubmit = () => {
    const { navigate } = this.props.navigation;
    const { selectedGuests } = this.state;

    navigate('Assignment', { selectedGuests });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.titleText}>Who's here?</Text>
          <View style={styles.guestButtonsContainer}>
            {this.state.guests.map(guest => (
              <GuestButton
                key={guest}
                guestName={guest}
                onPress={this.onPressGuest}
                selected={this.state.selectedGuests.includes(guest)}
              />
            ))}
          </View>
          <SubmitButton
            onPress={this.onSubmit}
            disabled={this.state.selectedGuests.length === 0}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  guestButtonsContainer: {
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  }
});
