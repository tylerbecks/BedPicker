import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AssignmentScreen from '../screens/AssignmentScreen';
import CoupleScreen from '../screens/CoupleScreen';
import GuestSelectionScreen from '../screens/GuestSelectionScreen';

const GuestSelectionStack = createStackNavigator(
  {
    GuestSelection: {
      screen: GuestSelectionScreen
    },
    Couple: {
      screen: CoupleScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);

GuestSelectionStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  )
};

const AssignmentStack = createStackNavigator({
  Assignment: AssignmentScreen
});

AssignmentStack.navigationOptions = {
  tabBarLabel: 'View',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bed' : 'md-bed'}
    />
  )
};

export default createBottomTabNavigator({
  GuestSelectionStack,
  AssignmentStack
});
