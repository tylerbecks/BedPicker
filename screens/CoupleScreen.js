import React from "react";
import _ from "lodash";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CoupleGallery from "../components/CoupleGallery";
import SelectButton from "../components/SelectButton";
import SubmitButton from "../components/SubmitButton";
import convertGuestsToSleepers from "../utils/convertGuestsToSleepers";

const styles = StyleSheet.create({
  guestSelectButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  plusSign: {
    fontSize: 32
  }
});

const getCoupleKey = (guest, coupledGuestsIdMap) => {
  let coupleKey;

  _.each(coupledGuestsIdMap, (value, key) => {
    if (value === guest.id || key === guest.id) {
      coupleKey = key;
      return false; // exit loop early
    }
  });

  return coupleKey;
};

const removeCouple = (selectedGuest, coupledGuestsIdMap) => {
  const coupleKey = getCoupleKey(selectedGuest, coupledGuestsIdMap);
  if (!coupleKey) {
    throw Error("coupleKey should exist");
  }

  return {
    coupledGuestsIdMap: _.omit(coupledGuestsIdMap, coupleKey)
  };
};

const addCouple = (selectedGuest, stagedGuest, coupledGuestsIdMap) => {
  return {
    stagedGuest: null,
    coupledGuestsIdMap: {
      ...coupledGuestsIdMap,
      [stagedGuest.id]: selectedGuest.id
    }
  };
};

export default class CoupleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupledGuestsIdMap: {},
      stagedGuest: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onPressGuest(selectedGuest) {
    this.setState(({ coupledGuestsIdMap, stagedGuest }) => {
      const isSelectedGuestInStaging = stagedGuest === selectedGuest;
      const isSelectedGuestCoupled = getCoupleKey(
        selectedGuest,
        coupledGuestsIdMap
      );

      if (isSelectedGuestInStaging) {
        return { stagedGuest: null };
      }
      if (isSelectedGuestCoupled) {
        return removeCouple(selectedGuest, coupledGuestsIdMap);
      }
      if (stagedGuest) {
        return addCouple(selectedGuest, stagedGuest, coupledGuestsIdMap);
      }

      return { stagedGuest: selectedGuest };
    });
  }

  onSubmit() {
    const { navigation } = this.props;
    const { coupledGuestsIdMap } = this.state;
    const selectedGuests = this.getSelectedGuests();
    const sleepers = convertGuestsToSleepers(
      selectedGuests,
      coupledGuestsIdMap
    );

    navigation.navigate("Assignment", { sleepers });
  }

  getSelectedGuests() {
    const { navigation } = this.props;

    return navigation.getParam("selectedGuests", []);
  }

  getCouples() {
    const { coupledGuestsIdMap } = this.state;
    const selectedGuests = this.getSelectedGuests();

    const coupleIds = _.toPairs(coupledGuestsIdMap);
    return _.map(coupleIds, ids => [
      _.find(selectedGuests, { id: ids[0] }),
      _.find(selectedGuests, { id: ids[1] })
    ]);
    // map over pairs and get couples
  }

  render() {
    const { stagedGuest, coupledGuestsIdMap } = this.state;
    const selectedGuests = this.getSelectedGuests();
    const couples = this.getCouples();

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.titleText}>Select couples</Text>

          <CoupleGallery couples={couples} />

          <View style={styles.guestSelectButtonsContainer}>
            {selectedGuests.map(guest => (
              <SelectButton
                key={guest.name}
                text={guest.name}
                photo={guest.photo}
                onPress={() => this.onPressGuest(guest)}
                selected={
                  guest === stagedGuest ||
                  getCoupleKey(guest, coupledGuestsIdMap)
                }
              />
            ))}
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
