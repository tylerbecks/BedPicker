import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import TabBarIcon from "../components/TabBarIcon";
import AssignmentScreen from "../screens/AssignmentScreen";
import CoupleScreen from "../screens/CoupleScreen";
import GuestSelectionScreen from "../screens/GuestSelectionScreen";

const CreationStack = createStackNavigator(
  {
    GuestSelection: {
      screen: GuestSelectionScreen
    },
    Couple: {
      screen: CoupleScreen
    }
  },
  {
    initialRouteName: "GuestSelection",
    navigationOptions: {
      tabBarLabel: "Create",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-people" : "md-people"}
        />
      )
    }
  }
);

const AssignmentStack = createStackNavigator(
  {
    Assignment: AssignmentScreen
  },
  {
    navigationOptions: {
      tabBarLabel: "View",
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-bed" : "md-bed"}
        />
      )
    }
  }
);

export default createBottomTabNavigator({
  CreationStack,
  AssignmentStack
});
