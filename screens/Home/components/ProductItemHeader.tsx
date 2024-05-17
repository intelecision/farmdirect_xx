import React from "react";
import {
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Bookmark from "./../../components/Bookmark";
interface ProductItemHeaderProps {
  imageUri: ImageSourcePropType;
  title: string;
  producer: string;
}

const ProductItemHeader = ({
  title,
  imageUri,
  producer,
}: ProductItemHeaderProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.itemImage} source={imageUri}>
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingRight: 20 }}
        ></View>
      </ImageBackground>

      <View style={styles.narrative}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.story}>{producer}</Text>
      </View>
    </View>
  );
};

export default ProductItemHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 450,
    //paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "Philosopher",
  },
  story: {
    marginVertical: 4,
    fontSize: 16,
    textAlign: "auto",
    fontFamily: "Roboto",
  },
  narrative: {
    backgroundColor: "white",
    padding: 20,
  },
  itemImage: {
    flex: 1,
    width: null,
    height: null,
    //resizeMode: "contain",
    // borderWidth: 1,
    borderColor: "#dddddd",
  },
});
