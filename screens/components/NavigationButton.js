import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import slides from "../../constants/slides";
import Paginator from "./Paginator";

const NavigationButton = ({ scrollTo, scrollBack, scrollX, percentage }) => {
  const { width } = useWindowDimensions;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.buttonLeft}
          activeOpacity={0.6}
          onPress={scrollBack}
        >
          <AntDesign name="arrowleft" size={32} color="#493d8a" />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // alignSelf: "baseline",
            paddingVertical: 20,
          }}
        >
          <Paginator data={slides} scrollX={scrollX} />
        </View>

        <TouchableOpacity
          style={[
            styles.buttonRight,
            { backgroundColor: percentage === 100 ? "tomato" : "#493d8a" },
          ]}
          activeOpacity={0.6}
          onPress={scrollTo}
        >
          <AntDesign
            name={percentage === 100 ? "check" : "arrowright"}
            size={32}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  buttonRight: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,

    padding: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
  },
  buttonLeft: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#fff",
    padding: 10,

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
  },
});
