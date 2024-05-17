import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

const HeaderLeftText = ({ onNavigate }) => {
  return (
    <TouchableOpacity onPress={onNavigate}>
      <Text style={{ color: "tomato" }}>Cancel</Text>
    </TouchableOpacity>
  );
};

export default HeaderLeftText;
