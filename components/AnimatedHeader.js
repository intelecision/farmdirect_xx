import React from "react";
import { StyleSheet, Text, View } from "react-native";

//import { Icon } from "react-native-vector-icons/FontAwesome5";
import Animated, { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { windowBackground } from "./../constants/colours";
import { StatusBar } from "expo-status-bar";

const { timing, Value } = Animated;
const HEADER_HEIGHT =
  Platform.OS === "ios" ? 115 : 70 + StatusBar.currentHeight;
//const HEADER_HEIGHT = 280;
//Platform.OS === "ios" ? 115 : 70 + StatusBar.currentHeight;

const AnimatedHeader = () => {
  const scroll_y = new Value(0);
  const _diff_clamp_scroll_y = Animated.diffClamp(scroll_y, 0, HEADER_HEIGHT);
  const header_height = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: "clamp",
  });
  const header_transform_y = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });
  const header_opacity = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.safe_area_view}>
      <StatusBar translucent barStyle="dark-content" />
      <Animated.View
        style={[
          styles.header,
          {
            height: header_height,
            transform: [{ translateY: header_transform_y }],
            opacity: header_opacity,
          },
        ]}
      >
        <Image
          source={require("./../assets/facebook-logo.png")}
          style={{ height: 30, width: 152 }}
        />
        <View style={styles.fake_icon_box}>
          <Ionicons
            name="search"
            size={22}
            color="#000000"
            onPress={() => alert("Why click me!")}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={[styles.Scroll_view]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={5}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scroll_y } },
          },
        ])}
      >
        <View style={[styles.fake_box, { backgroundColor: "#222222" }]} />
        <View style={[styles.fake_box, { backgroundColor: "#333333" }]} />
        <View style={[styles.fake_box, { backgroundColor: "#444444" }]} />
        <View style={[styles.fake_box, { backgroundColor: "#444444" }]} />
      </Animated.ScrollView>
    </View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 1000,
    elevation: 1000,
  },
  fake_icon_box: {
    flexDirection: "row",
    width: 40,
    height: 40,
    backgroundColor: "#e4e6eb",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  Scroll_view: {
    flex: 1,
    backgroundColor: windowBackground,
  },
  fake_box: {
    height: 250,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
