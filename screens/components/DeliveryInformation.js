import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const DeliveryInformation = ({
  deliveryAddress,
  digitalAddress,
  deliveryTown,
  addressNickName,
  onAddressPress,
}) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View
        style={{
          flex: 1,
          // height: 40,
          borderBottomWidth: 0.5,
          borderBottomColor: '#dddddd',
          backgroundColor: '#EFEBE8',
          justifyContent: 'center',
        }}
      >
        {/*<Text style={{ margin: 4, fontSize: 15, fontWeight: "normal" }}>
          Delivery address
        </Text>*/}
      </View>
      <View style={{ flexDirection: 'column', margin: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{addressNickName}</Text>
        <TouchableOpacity onPress={onAddressPress}>
          <View style={{ flexDirection: 'row', marginTop: 1 }}>
            <View style={{ flex: 3, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text>{deliveryAddress}</Text>
                <Text>{deliveryTown}</Text>
              </View>
              <Text>{digitalAddress}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon
                type='ionicon'
                name='chevron-forward-outline'
                color='tomato'
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryInformation;
