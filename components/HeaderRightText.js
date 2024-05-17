import React from "react";
import { Text, TouchableOpacity } from "react-native";
const HeaderRightText = ({ rightText, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: "tomato", fontWeight: "700" }}>{rightText}</Text>
    </TouchableOpacity>
  );
};

export default HeaderRightText;
