import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  paymentStatus: string;
  method: string;
};

const PaymentComplete = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FontAwesome name="circle" size={80} color="tomato" />
        <Text>Order was completed successfully</Text>
      </View>
      <View style={styles.content}>
        <Text>Your Mobile Money Accounts was successfully charged</Text>
        <Text>receipts will be sent to your email</Text>
      </View>
    </View>
  );
};

export default PaymentComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
