import React from 'react';
import { TouchableHighlight } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Image, Icon } from '@rneui/themed';

const RecipeItem = ({ recipe, onPress }) => {
  const imagePath =
    'http://www.otuofarms.com/farmdirect/images/recipes/' + recipe.imageUri;

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: imagePath }}
            style={styles.imageStyle}
            // PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            height: 150,
          }}
        >
          <View>
            <Text style={styles.recipeText}> {recipe.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <Icon
              name='restaurant-outline'
              type='ionicon'
              color='tomato'
              size={20}
            />
            <Text style={{ margin: 6 }}>Serves {recipe.numberOfServings}</Text>
            <Icon
              name='alarm-outline'
              type='ionicon'
              color='tomato'
              size={20}
            />
            <Text style={{ margin: 6 }}>{recipe.timeToPrepare}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imageStyle: { resizeMode: 'cover', height: 200 },
  recipeText: { margin: 10, fontSize: 20, fontWeight: '700' },
});
