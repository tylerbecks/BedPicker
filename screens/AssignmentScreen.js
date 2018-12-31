import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import BedSection from '../components/BedSection';
import Assigner from '../components/Assigner';

const tahoeBeds = [
  { type: 'twin', name: 'upstairs twin', guests: [] },
  { type: 'queen', name: 'master', guests: [] },
  { type: 'twin', name: 'upstairs twin', guests: [] },
  { type: 'full', name: 'upstairs full', guests: [] },
  { type: 'full', name: 'couch', guests: [] }
];

//  bed: {
//    type: string
//    name: string
//    guests: [string]
//  }

export default class AssignmentScreen extends React.Component {
  state = {
    assignment: null
  };

  componentDidMount() {
    this.setAssignment(this.props.navigation);
  }

  componentWillReceiveProps(nextProps) {
    this.setAssignment(nextProps.navigation);
  }

  setAssignment = navigation => {
    const selectedGuests = navigation.getParam('selectedGuests', []);
    const assigner = new Assigner(selectedGuests, tahoeBeds);
    this.setState({ assignment: assigner.assign() });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.state.assignment &&
            this.state.assignment.map(({ type, name, guests }, index) => (
              <BedSection key={index} type={type} name={name} guests={guests} />
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingBottom: 20
  }
});
