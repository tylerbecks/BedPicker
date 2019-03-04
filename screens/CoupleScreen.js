import React from 'react';
import _ from 'lodash';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PhotoSelectButton from '../components/PhotoSelectButton';
import TextSelectButton from '../components/TextSelectButton';
import SubmitButton from '../components/SubmitButton';
import CoupleGallery from '../components/CoupleGallery';
import convertGuestsToSleepers from '../utils/convertGuestsToSleepers';

export default class CoupleScreen extends React.Component {
  state = {
    coupledGuestsIdMap: {},
    stagedGuest: null
  };

  onPressGuest = selectedGuest => {
    this.setState(({ coupledGuestsIdMap, stagedGuest }) => {
      const isSelectedGuestInStaging = stagedGuest === selectedGuest;
      const isSelectedGuestCoupled = this.getCoupleKey(
        selectedGuest,
        coupledGuestsIdMap
      );

      if (isSelectedGuestInStaging) {
        return { stagedGuest: null };
      } else if (isSelectedGuestCoupled) {
        return this.removeCouple(selectedGuest, coupledGuestsIdMap);
      } else if (stagedGuest) {
        return this.addCouple(selectedGuest, stagedGuest, coupledGuestsIdMap);
      } else {
        return { stagedGuest: selectedGuest };
      }
    });
  };

  removeCouple = (selectedGuest, coupledGuestsIdMap) => {
    let coupleKey = this.getCoupleKey(selectedGuest, coupledGuestsIdMap);
    if (!coupleKey) {
      throw Error('coupleKey should exist');
    }

    return {
      coupledGuestsIdMap: _.omit(coupledGuestsIdMap, coupleKey)
    };
  };

  getCoupleKey = (guest, coupledGuestsIdMap) => {
    let coupleKey;

    _.each(coupledGuestsIdMap, (value, key) => {
      if (value === guest.id || key === guest.id) {
        coupleKey = key;
        return false; // exit loop early
      }
    });

    return coupleKey;
  };

  addCouple = (selectedGuest, stagedGuest, coupledGuestsIdMap) => ({
    stagedGuest: null,
    coupledGuestsIdMap: Object.assign({}, coupledGuestsIdMap, {
      [stagedGuest.id]: selectedGuest.id
    })
  });

  onSubmit = () => {
    const selectedGuests = this.getSelectedGuests();
    const sleepers = convertGuestsToSleepers(
      selectedGuests,
      this.state.coupledGuestsIdMap
    );
    this.props.navigation.navigate('Assignment', { sleepers });
  };

  scrollToBottom = () => {
    setTimeout(() => {
      this._scrollView.scrollToEnd({ animated: true });
    }, 100);
  };

  getSelectedGuests = () =>
    this.props.navigation.getParam('selectedGuests', []);

  getCouples = () => {
    const { coupledGuestsIdMap } = this.state;
    const selectedGuests = this.getSelectedGuests();

    const coupleIds = _.toPairs(coupledGuestsIdMap);
    return _.map(coupleIds, ids => [
      _.find(selectedGuests, { id: ids[0] }),
      _.find(selectedGuests, { id: ids[1] })
    ]);
    // map over pairs and get couples
  };

  render() {
    const { stagedGuest, coupledGuestsIdMap } = this.state;
    const selectedGuests = this.getSelectedGuests();
    const couples = this.getCouples();

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          ref={c => (this._scrollView = c)}
        >
          <Text style={styles.titleText}>Select couples</Text>

          <CoupleGallery couples={couples} />

          <View style={styles.guestSelectButtonsContainer}>
            {selectedGuests.map((guest, index) =>
              guest.photo ? (
                <PhotoSelectButton
                  key={index}
                  text={guest.name}
                  photo={guest.photo}
                  onPress={() => this.onPressGuest(guest)}
                  selected={
                    guest === stagedGuest ||
                    this.getCoupleKey(guest, coupledGuestsIdMap)
                  }
                />
              ) : (
                <TextSelectButton
                  key={index}
                  text={guest.name}
                  onPress={() => this.onPressGuest(guest)}
                  selected={
                    guest === stagedGuest ||
                    this.getCoupleKey(guest, coupledGuestsIdMap)
                  }
                />
              )
            )}
          </View>
          <SubmitButton
            onPress={this.onSubmit}
            disabled={false}
            text="Submit"
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
