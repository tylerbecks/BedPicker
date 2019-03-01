import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PhotoSelectButton from '../components/PhotoSelectButton';
import TextSelectButton from '../components/TextSelectButton';
import SubmitButton from '../components/SubmitButton';
import CircleButton from '../components/CircleButton';
import DEFAULT_GUESTS from '../constants/DefaultGuests';

export default class CoupleScreen extends React.Component {
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
            onPress={this.onSubmit}
            disabled={this.state.selectedGuests.length === 0}
          />
        </ScrollView>
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
