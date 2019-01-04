import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GuestButton from '../components/GuestButton';
import SubmitButton from '../components/SubmitButton';

const DEFAULT_GUESTS = [
  { name: 'Aaron', photo: require('../assets/images/aaron.jpg') },
  { name: 'Barak', photo: require('../assets/images/barak.jpg') },
  { name: 'Cheryl', photo: require('../assets/images/cheryl.jpg') },
  { name: 'Daniel', photo: require('../assets/images/daniel.jpg') },
  { name: 'Jeremy', photo: require('../assets/images/jeremy.jpg') },
  { name: 'Josh', photo: require('../assets/images/josh.jpg') },
  { name: 'Noah', photo: require('../assets/images/noah.jpg') },
  { name: 'Raj', photo: require('../assets/images/raj.jpg') },
  { name: 'Tyler', photo: require('../assets/images/tyler.jpg') }
];

export default class AssignmentScreen extends React.Component {
  state = {
    selectedGuests: [],
    guests: DEFAULT_GUESTS
  };

  onPressGuest = guest => {
    const selectedGuests = this.state.selectedGuests.includes(guest)
      ? _.without(this.state.selectedGuests, guest)
      : _.concat(this.state.selectedGuests, guest);

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
            {this.state.guests.map((guest, index) => (
              <GuestButton
                key={index}
                guest={guest}
                onPress={() => this.onPressGuest(guest)}
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
    justifyContent: 'center',
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
