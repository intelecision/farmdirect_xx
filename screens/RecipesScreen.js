import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import RecipeItem from './Message/Components/RecipeItem';
import { globalStyles } from './../styles/global';
import { useNavigation } from '@react-navigation/core';
export default function RecipesScreen() {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    loadRecipes();

    return () => {};
  }, []);

  const loadRecipes = () => {
    axios
      .get('http://www.otuofarms.com/farmdirect/api/recipe')
      .then((response) => {
        if (response.status == 200) {
          setRecipes(response.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => {
    return (
      <RecipeItem
        recipe={item}
        onPress={() => {
          navigation.navigate('RecipeDetail', { recipeItem: item });
        }}
      />
    );
  };
  return (
    <View style={globalStyles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={recipes}
        //   refreshing={refreshing}
        renderItem={renderItem}
      />
    </View>
  );
}
