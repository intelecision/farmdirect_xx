import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ onPress, onRegister }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, margin: 10 }}>
        Log in and personalize your shopping
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "tomato",
          width: 300,
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
          }}
        >
          Log in
        </Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          height: 20,
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 16, alignItems: "center" }}>
          Don't have an account?
        </Text>
        <TouchableOpacity style={{ height: 20 }} onPress={onRegister}>
          <Text style={{ fontSize: 16, color: "red" }}> register now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderColor: "#dddddd",
    borderWidth: 0.25,
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});
