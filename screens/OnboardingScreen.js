import React, { memo } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import Onboarding from "./components/Onboarding";

const OnboardingScreen = memo(({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Onboarding navigation={navigation} />
    </View>
  );
});

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
