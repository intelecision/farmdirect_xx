import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import PropTypes from "prop-types";
import { categoryImages } from "./../../utils/imagesArray";

function CategoryCard({ categoryName, imageUri, onPress }) {
  let categoryImage = categoryImages.find((o) => o.name === categoryName);

  if (categoryImage) {
    imageUri = categoryImage.uri;
  }
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"white"}>
      <View style={styles.MainContainer}>
        <View style={{ height: 130, width: null }}>
          <Image source={imageUri} style={styles.imageStyle} />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text
            style={{
              textAlign: "justify",
              fontWeight: "600",
              fontSize: 16,
              color: "black",
              fontFamily: "Roboto",
            }}
          >
            {categoryName}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

CategoryCard.propTypes = {
  categoryName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    height: 180,
    width: 195,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  imageStyle: {
    flex: 2,
    height: null,
    width: null,
    resizeMode: "cover",
  },
});
export default CategoryCard;
