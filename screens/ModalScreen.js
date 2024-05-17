import React, { useState } from "react";
import { StyleSheet, Modal, View, ScrollView } from "react-native";
import Animated from "react-native-reanimated";

const HEADER_HEIGHT = 70;

const ModalScreen = ({ children, modalVisible, onClose, ...props }) => {
  const scroll_y = new Animated.Value(0);
  const _diff_clamp_scroll_y = Animated.diffClamp(scroll_y, 0, HEADER_HEIGHT);
  const header_y = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    // extrapolate: "clamp",
  });
  return (
    //<View style={styles.content}>
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          marginTop: 40,
        }}
      >
        {/*header*/}

        {children}
      </View>
    </Modal>
    //</View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  content: {
    marginBottom: 0,
    marginTop: 40,
    backgroundColor: "white",
  },
  header: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: "tomato",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
});
