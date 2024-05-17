import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HeaderTitle = ({
  title,
  rightText,
  showRightComponent = true,
  onPress,
}) => {
  return (
    <View>
      <View
        style={{
          flex: 3,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 3 }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              margin: 10,
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            marginRight: 10,
            marginTop: 20,
          }}
          onPress={onPress}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {showRightComponent ? (
              <>
                <Text style={{ marginRight: 10 }}>{rightText}</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="red"
                  iconStyle={{
                    alignSelf: "flex-end",
                    fontSize: 20,
                  }}
                />
              </>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
