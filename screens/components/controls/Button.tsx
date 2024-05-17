import { Function } from "@babel/types";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export interface ButtonProps {
  title: string;
  disabled: boolean;
  isBusy: boolean;
  onPress(): void;
}

function Button({
  title,
  disabled = false,
  isBusy = false,
  onPress,
}: ButtonProps) {
  let buttonStyle = [];
  if (disabled) {
    buttonStyle.push(styles.disabledStyle);
  } else {
    buttonStyle.push(styles.enabledStyle);
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isBusy ? (
          <ActivityIndicator animating={isBusy} size="small" color="white" />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  enabledStyle: {
    height: 50,
    //backgroundColor: "#224e7a",
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  disabledStyle: {
    height: 50,
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
});
