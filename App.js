/* eslint-disable global-require */
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppNavigator from "./navigation/AppNavigator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/aaron.jpg"),
        require("./assets/images/barak.jpg"),
        require("./assets/images/cheryl.jpg"),
        require("./assets/images/daniel.jpg"),
        require("./assets/images/jeremy.jpg"),
        require("./assets/images/josh.jpg"),
        require("./assets/images/noah.jpg"),
        require("./assets/images/raj.jpg"),
        require("./assets/images/tyler.jpg")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  const handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  );
};
