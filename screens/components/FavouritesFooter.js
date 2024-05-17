import React from "react";
import { View, Text } from "react-native";
import { memo } from "react";

const FavouritesFooter = memo(function FavouritesFooter({ ...props }) {
  return (
    <View style={{ flex: 1, padding: 20, flexDirection: "row" }}>
      <View
        style={{
          width: "60%",
          flexDirection: "colum",
          justifyContent: "space-evenly",
        }}
      >
        <Text>
          Items <Text style={{ fontWeight: "700" }}>favourites.length</Text>
        </Text>

        <Text>
          Total <Text style={{ fontWeight: "700" }}>GH₵ totalAmount</Text>
        </Text>
      </View>
      {/*<View
        style={{
          //width: "40%",

          justifyContent: "center",
        }}
      >
      <Text>hello world </Text>
        <Button
          title={"Add all to basket"}
          buttonStyle={{
            height: 50,
            backgroundColor: "tomato",
            borderRadius: 10,
          }}
          // onPress={() => handleAddAll()}
        />
      </View>*/}
    </View>
  );
});

export default FavouritesFooter;
