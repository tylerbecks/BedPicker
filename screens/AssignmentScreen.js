import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import BedSection from "../components/BedSection";
import AvatarItem from "../components/AvatarItem";
import Assigner from "../utils/Assigner";
import Bed from "../utils/classes/Bed";

const getTahoeBeds = () => [
  new Bed("queen", "Master Queen"),
  new Bed("twin", "Upstairs twin 1"),
  new Bed("twin", "Upstairs twin 2"),
  new Bed("full", "Upstairs full")
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 8
  },
  contentContainer: {},
  date: {
    marginTop: 20
  },
  dateContainer: {
    alignItems: "center"
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12
  }
});

export default ({ navigation }) => {
  const [assignment, setAssignment] = useState(null);
  let sleepers = navigation.getParam("sleepers", []);

  const onChangeAssignment = newSleepers => {
    sleepers = newSleepers;
    const assigner = new Assigner(sleepers, getTahoeBeds());
    setAssignment(assigner.createAssignment());
  };

  useEffect(() => {
    onChangeAssignment(sleepers);
  }, [sleepers]);

  const getFormattedDate = () => {
    if (!assignment || !assignment.date) {
      throw Error("expected assignment date to exist!");
    }

    const date = new Date(assignment.date);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  };

  if (!assignment) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {assignment.beds.map(({ name, guests }) => (
          <BedSection key={name} name={name} guests={guests} />
        ))}
        <Text style={styles.sectionHeader}>Guests without beds</Text>
        {assignment.guestsWithoutBeds.map(guest => (
          <AvatarItem key={guest.id} text={guest.name} photo={guest.photo} />
        ))}
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{getFormattedDate()}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
