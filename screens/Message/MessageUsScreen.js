import React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "./../../styles/global";

const MessageUsScreen = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <View style={{ height: 200, backgroundColor: "green" }}></View>
        <View style={{ flex: 1, backgroundColor: "yellow" }}></View>
        <View
          style={{
            height: 80,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "#ddd",
            paddingBottom: 30,
          }}
        >
          <TextInput placeholder="019090930" style={{ height: 40 }} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageUsScreen;
