import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";

const OrderTotalLine = ({ title, totalAmount }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "space-between",
          margin: 10
        }}
      >
        <View style={{ flex: 3 }}>
          <Text>{title}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={{ textAlign: "right" }}>GH₵{totalAmount}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderTotalLine;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  LineTitle: {}
});
