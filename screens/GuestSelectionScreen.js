import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MultiAddModal from '../components/MultiAddModal';
import GuestButton from '../components/GuestButton';
import SubmitButton from '../components/SubmitButton';
import CircleButton from '../components/CircleButton';

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
    guests: DEFAULT_GUESTS,
    isModalVisible: false
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

  addGuest = guestName => {
    const newGuest = {
      name: guestName,
      photo: null
    };

    this.setState({
      guests: this.state.guests.concat(newGuest)
    });
    this.scrollToBottom();
  };

  openModal = () => {
    this.setState({ isModalVisible: true });
    this.scrollToBottom();
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  scrollToBottom = () => {
    setTimeout(() => {
      this._scrollView.scrollToEnd({ animated: true });
    }, 100);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          ref={c => (this._scrollView = c)}
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
            <CircleButton onPress={this.openModal}>
              <Text style={styles.plusSign}>+</Text>
            </CircleButton>
          </View>
          <SubmitButton
            onPress={this.onSubmit}
            disabled={this.state.selectedGuests.length === 0}
          />
          {this.state.isModalVisible && <View style={{ height: 350 }} />}
        </ScrollView>

        <MultiAddModal
          placeholder="Guest name..."
          isVisible={this.state.isModalVisible}
          close={this.closeModal}
          onSubmit={this.addGuest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  guestButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  plusSign: {
    fontSize: 32
  }
});
