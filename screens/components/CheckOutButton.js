import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

const CheckoutButton = ({
  label,
  totalPrice,
  totalDiscount,
  onPress,
  disabled,
  size,
}) => {
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "row",
        borderTopWidth: 0.5,
        borderTopColor: "#dddddd",
        height: size === undefined ? 50 : size,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            textAlign: "left",
            textAlignVertical: "center",
            fontFamily: Platform.OS === "ios" ? "Cochin" : "Roboto",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              textAlign: "left",
              textAlignVertical: "center",
              fontFamily: Platform.OS === "ios" ? "Cochin" : "Roboto",
            }}
          >
            GH₵
          </Text>
          {totalPrice}
        </Text>
        {totalDiscount > 0 ? (
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              textAlignVertical: "center",
            }}
          >
            Discount:GH₵{totalDiscount}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: disabled ? "#ddd" : "tomato",
          margin: 5,
          height: 50,
          borderRadius: 20,
          height: 45,
        }}
      >
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 48,
              width: null,
              // borderRadius: 20,
              // height: 45,
              // backgroundColor: "#f2e4e1",
              // borderColor: "tomato",
              // borderWidth: 0.75,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "white",
                justifyContent: "center",
                textAlign: "center",
                margin: 10,
                height: null,
              }}
            >
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutButton;

const styles = StyleSheet.flatten({});
