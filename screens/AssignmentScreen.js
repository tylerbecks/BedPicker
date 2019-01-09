import React from 'react';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import BedSection from '../components/BedSection';
import Assigner from '../utils/Assigner';
import Bed from '../utils/classses/Bed';
import Sleeper from '../utils/classses/Sleeper';

const getTahoeBeds = () => [
  new Bed('twin', 'Upstairs twin'),
  new Bed('queen', 'Master'),
  new Bed('twin', 'Upstairs twin'),
  new Bed('full', 'Upstairs full'),
  new Bed('full', 'Couch')
];

export default class AssignmentScreen extends React.Component {
  state = {
    assignment: null
  };

  selectedGuests = null;

  componentDidMount() {
    const selectedGuests = this.props.navigation.getParam('selectedGuests', []);
    this.setAssignment(selectedGuests);
  }

  componentWillReceiveProps(nextProps) {
    const selectedGuests = nextProps.navigation.getParam('selectedGuests', []);
    if (selectedGuests !== this.selectedGuests) {
      this.setAssignment(selectedGuests);
    }
  }

  setAssignment = selectedGuests => {
    this.selectedGuests = selectedGuests;
    const sleepers = _.map(selectedGuests, guest => new Sleeper(guest));
    const assigner = new Assigner(sleepers, getTahoeBeds());
    this.setState({ assignment: assigner.createAssignment() });
  };

  getFormattedDate = () => {
    const { assignment } = this.state;
    if (!assignment || !assignment.date) {
      throw Error('expected assignment date to exist!');
    }

    const date = new Date(assignment.date);

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  render() {
    if (!this.state.assignment) {
      return (
        <View style={styles.container}>
          <Text>No assignment yet!</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.state.assignment.beds.map(({ name, guests }, index) => (
            <BedSection key={index} name={name} guests={guests} />
          ))}
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{this.getFormattedDate()}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 8
  },
  contentContainer: {},
  date: {
    marginTop: 20
  },
  dateContainer: {
    alignItems: 'center'
  }
});
