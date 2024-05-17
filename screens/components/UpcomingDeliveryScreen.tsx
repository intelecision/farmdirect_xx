import { View, FlatList } from 'react-native';
import React from 'react';

import { lightTomatoes } from '../../constants/colours';
import { useSelector } from 'react-redux';
import DeliveryItem from './DeliveryItem';

const UpcomingDeliveryScreen = ({ props }) => {
  const deliveryList = useSelector((state) => state.pendingDeliveries);
  const renderItems = ({ item }) => {
    console.log('item', item);
    return (
      <DeliveryItem orderDate={item.orderDate} status={item.orderStatus} />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: lightTomatoes }}>
      <FlatList
        style={{ marginHorizontal: 10, marginVertical: 10 }}
        data={deliveryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
      />
    </View>
  );
};

export default UpcomingDeliveryScreen;
