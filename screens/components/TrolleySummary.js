import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function TrolleySummary({ orderItems }) {
  function trolleyItem(item, key) {
    return (
      <View key={key} style={{ backgroundColor: "#EFEBE8" }}>
        <View
          style={{
            paddingHorizontal: 10,
            height: 70,
            marginBottom: 2,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontWeight: "700", marginTop: 10 }}>
            {item?.product?.productName}
          </Text>
          <View
            style={{
              flexDirection: "row",
            //  marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Text>Quantity: {item.quantity}</Text>
            <Text>GH¢{item.totalPrice?.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
        //  marginBottom: 10,
         marginTop: 10,
        }}
      >
        Trolley Summary
      </Text>
      {orderItems?.map((item, index) => trolleyItem(item, index))}
    </View>
  );
}

const styles = StyleSheet.create({});

//"discount": undefined,
//"productId": 6,
//"quantity": 1,
//"totalPrice": 600,
//"unitPrice": 600,
