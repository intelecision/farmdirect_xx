import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { greenTomatoes, warningRed } from "./../../constants/colours";

const MessageBar = ({ messageText, isWarning, visible = true }) => {
  return visible ? (
    <View
      style={[
        styles.container,
        { backgroundColor: isWarning === false ? greenTomatoes : warningRed },
      ]}
    >
      <Text style={styles.textStyle}>{messageText}</Text>
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontWeight: "bold",
    justifyContent: "center",
    height: 30,
    // backgroundColor: !isWarning ? "green" : "red"
  },
  textStyle: {
    textAlign: "center",
    marginLeft: 10,
    color: "white",
  },
});

export default MessageBar;
