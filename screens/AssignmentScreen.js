import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    const selectedGuests = this.props.navigation.getParam('selectedGuests', []);
    const assigner = new Assigner(selectedGuests, tahoeBeds);
    this.setState({ assignment: assigner.assign() });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.assignment &&
          this.state.assignment.map(({ type, name, guests }, index) => (
            <BedSection key={index} type={type} name={name} guests={guests} />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
