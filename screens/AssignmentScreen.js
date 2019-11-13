import React from "react";
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

export default class AssignmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: null
    };

    this.sleepers = null;
  }

  componentDidMount() {
    const { navigation } = this.props;

    const sleepers = navigation.getParam("sleepers", []);
    this.setAssignment(sleepers);
  }

  componentWillReceiveProps(nextProps) {
    const sleepers = nextProps.navigation.getParam("sleepers", []);
    if (sleepers !== this.sleepers) {
      this.setAssignment(sleepers);
    }
  }

  setAssignment(sleepers) {
    this.sleepers = sleepers;
    const assigner = new Assigner(sleepers, getTahoeBeds());
    this.setState({ assignment: assigner.createAssignment() });
  }

  getFormattedDate() {
    const { assignment } = this.state;
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
  }

  render() {
    const { assignment } = this.state;

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
            <Text style={styles.date}>{this.getFormattedDate()}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
