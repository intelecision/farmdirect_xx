import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
export default class Welcome extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700" }}>
          Things you may want to buy!
        </Text>
        <Text style={{ fontWeight: "100", marginTop: 10 }}>
          A new selection of fruits and Veg from your local farmer
        </Text>

        <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderWidth: 1,
              borderColor: "#dddddd",
            }}
            source={require("./../../assets/sns.jpeg")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.flatten({});
