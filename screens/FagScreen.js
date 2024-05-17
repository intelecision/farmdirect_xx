import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { windowBackground } from "../constants/colours";
import { FlatList } from "react-native-gesture-handler";

const FagScreen = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    axios
      .get("http://www.otuofarms.com/farmdirect/api/faq/")
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  renderItem = ({ item }) => {
    return (
      <View style={styles.faq_box}>
        <Text
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {item.question}
        </Text>
        <Text style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          {item.answer}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: windowBackground }}>
      <View style={{ flex: 1, paddingHorizontal: 0 }}>
        <FlatList
          data={faqs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default FagScreen;

const styles = StyleSheet.create({
  faq_box: {
    minHeight: 100,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: "white",
  },
});
