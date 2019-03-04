import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MultiAddModal from '../components/MultiAddModal';
import PhotoSelectButton from '../components/PhotoSelectButton';
import TextSelectButton from '../components/TextSelectButton';
import SubmitButton from '../components/SubmitButton';
import CircleButton from '../components/CircleButton';
import DEFAULT_GUESTS from '../constants/DefaultGuests';

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

  onClickNext = () => {
    const { push } = this.props.navigation;
    const { selectedGuests } = this.state;

    push('Couple', { selectedGuests });
  };

  addGuest = guestName => {
    const newGuest = {
      id: _.uniqueId(),
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
          <View style={styles.guestSelectButtonsContainer}>
            {this.state.guests.map((guest, index) =>
              guest.photo ? (
                <PhotoSelectButton
                  key={index}
                  text={guest.name}
                  photo={guest.photo}
                  onPress={() => this.onPressGuest(guest)}
                  selected={this.state.selectedGuests.includes(guest)}
                />
              ) : (
                <TextSelectButton
                  key={index}
                  text={guest.name}
                  onPress={() => this.onPressGuest(guest)}
                  selected={this.state.selectedGuests.includes(guest)}
                />
              )
            )}
            <CircleButton onPress={this.openModal}>
              <Text style={styles.plusSign}>+</Text>
            </CircleButton>
          </View>
          <SubmitButton
            onPress={this.onClickNext}
            disabled={this.state.selectedGuests.length === 0}
            text="Next"
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
  guestSelectButtonsContainer: {
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
