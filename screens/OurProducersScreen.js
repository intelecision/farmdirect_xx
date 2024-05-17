import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import ProducerCard from './components/ProducerCard';

const { width, height } = Dimensions.get('window');
const OurProducersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [producersList, setProducersList] = useState([{}]);

  useEffect(() => {
    loadProducers();
    return () => {};
  }, []);

  const loadProducers = () => {
    axios
      .get('http://www.otuofarms.com/farmdirect/api/farms/')
      .then((response) => {
        setProducersList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderItems = ({ item }) => {
    return (
      <ProducerCard
        title={item.farmName}
        narrative={item.narrative}
        image={item.imageUri?.trim()}
        onCardPress={() => {
          navigation.navigate('Producer', {
            farmId: item?.id,
            producer: item,
          });
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={producersList}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default OurProducersScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 70,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  narrative: {},
});
