import React, { memo } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const OnboardingItem = memo(({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
});

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 24,
    marginBottom: 10,
    color: "#493d8a",
    textAlign: "center",
    fontFamily: "Philosopher",
  },
  description: {
    fontWeight: "300",

    color: "#62656b",
    textAlign: "auto",
    paddingHorizontal: 62,
  },
});
