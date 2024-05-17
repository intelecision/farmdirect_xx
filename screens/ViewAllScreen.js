import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewAllScreen({ route, navigation }) {
  const { title, filter } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {/*{listOfItems.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}*/}
      </View>
    </SafeAreaView>
  );
}
