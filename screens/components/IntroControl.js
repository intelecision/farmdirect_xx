import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
} from "react-native";

const { height, width } = Dimensions.get("window");

const IntroControl = ({
  heading,
  caption,
  producerId,
  imageUri,
  onIntroPress,
}) => {
  return (
    <View style={{ height: 290, marginTop: 10, paddingHorizontal: 10 }}>
      <TouchableHighlight onPress={onIntroPress}>
        <View>
          <View style={{ width: width - 20, height: 290 }}>
            <ImageBackground style={style.welcomeImage} source={imageUri} />
          </View>
          <View style={style.container2}>
            <Text style={style.textInBold}>{heading}</Text>
            <Text style={style.storyText}>{caption}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textInBold: {
    fontWeight: "700",
    fontSize: 24,
    marginLeft: 20,
    justifyContent: "space-around",
    color: "white",
  },
  storyText: {
    fontWeight: "600",
    paddingLeft: 20,
    color: "white",
  },
  welcomeImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  container2: {
    fontWeight: "200",
    paddingVertical: 10,
    color: "white",
    width: "90%",
    position: "absolute",
    top: 170,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default IntroControl;
