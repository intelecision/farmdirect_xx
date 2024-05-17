import React, { Component } from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function IconWithBadge ({ ...props }) {
  const { name, badgeCount, color, size } = props;
  return (
    <View style={{ width: 30, height: 30, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -3,
            top: -3,
            backgroundColor: "tomato",
            borderRadius: 9,
            width: 18,
            height: 18,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}


export default IconWithBadge;
