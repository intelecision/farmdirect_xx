import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { windowBackground } from './../constants/colours';
import Animated from 'react-native-reanimated';

const HEADER_HEIGHT = 115;
const AnimatedHeader2 = () => {
  const [showModal, setShowModal] = useState(false);

  const scroll_y = new Animated.Value(0);
  const _diff_clamp_scroll_y = Animated.diffClamp(
    scroll_y,
    0,
    HEADER_HEIGHT - 40
  );
  const header_y = Animated.interpolateNode(_diff_clamp_scroll_y, {
    inputRange: [0, HEADER_HEIGHT - 40],
    outputRange: [0, -HEADER_HEIGHT + 40],
    // extrapolate: "clamp",
  });
  return (
    <View
      style={{
        flex: 1,
        //marginTop: 40,
      }}
    >
      {/*header*/}
      <Animated.View
        style={{
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          backgroundColor: 'red',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          elevation: 1000,
          height: HEADER_HEIGHT,
          transform: [{ translateY: header_y }],
          alignItems: 'center',
          justifyContent: 'center',
          // opacity: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Header title</Text>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scroll_y } },
          },
        ])}
      >
        <View style={[styles.fake_box, { backgroundColor: '#222222' }]} />
        <View style={[styles.fake_box, { backgroundColor: '#333333' }]} />
        <View style={[styles.fake_box, { backgroundColor: '#444444' }]} />
        <View style={[styles.fake_box, { backgroundColor: '#444444' }]} />
      </Animated.ScrollView>
    </View>
  );
};

export default AnimatedHeader2;

const styles = StyleSheet.create({
  fake_icon_box: {
    flexDirection: 'row',
    width: 40,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
