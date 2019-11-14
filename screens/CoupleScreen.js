import React, { useState } from "react";
import { each, omit, toPairs, map, find } from "lodash";
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

export default ({ navigation }) => {
  const [coupledGuestsIdMap, setCoupledGuestsIdMap] = useState({});
  const [stagedGuest, setStagedGuest] = useState(null);

  const addCouple = selectedGuest => {
    setStagedGuest(null);
    setCoupledGuestsIdMap({
      ...coupledGuestsIdMap,
      [stagedGuest.id]: selectedGuest.id
    });
  };

  const getCoupleKey = guest => {
    let coupleKey;

    each(coupledGuestsIdMap, (value, key) => {
      if (value === guest.id || key === guest.id) {
        coupleKey = key;
        return false; // exit loop early
      }
    });

    return coupleKey;
  };

  const removeCouple = selectedGuest => {
    const coupleKey = getCoupleKey(selectedGuest);
    if (!coupleKey) {
      throw Error("coupleKey should exist");
    }

    setCoupledGuestsIdMap(omit(coupledGuestsIdMap, coupleKey));
  };

  const onPressGuest = selectedGuest => {
    const isSelectedGuestInStaging = stagedGuest === selectedGuest;
    const isSelectedGuestCoupled = getCoupleKey(selectedGuest);

    if (isSelectedGuestInStaging) {
      setStagedGuest(null);
      return;
    }
    if (isSelectedGuestCoupled) {
      removeCouple(selectedGuest);
      return;
    }
    if (stagedGuest) {
      addCouple(selectedGuest);
      return;
    }

    setStagedGuest(selectedGuest);
  };

  const getSelectedGuests = () => {
    return navigation.getParam("selectedGuests", []);
  };

  const onSubmit = () => {
    const selectedGuests = getSelectedGuests();
    const sleepers = convertGuestsToSleepers(
      selectedGuests,
      coupledGuestsIdMap
    );

    navigation.navigate("Assignment", { sleepers });
  };

  const getCouples = () => {
    const selectedGuests = getSelectedGuests();

    const coupleIds = toPairs(coupledGuestsIdMap);
    return map(coupleIds, ids => [
      find(selectedGuests, { id: ids[0] }),
      find(selectedGuests, { id: ids[1] })
    ]);
    // map over pairs and get couples
  };

  const selectedGuests = getSelectedGuests();
  const couples = getCouples();

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
              onPress={() => onPressGuest(guest)}
              selected={guest === stagedGuest || getCoupleKey(guest)}
            />
          ))}
        </View>
        <SubmitButton onPress={onSubmit} disabled={false} text="Submit" />
      </ScrollView>
    </View>
  );
};
