import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const DeliveryInstructions = ({ deliveryInstruction, onPress }) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'white' }}>
      <View style={{ flex: 3, flexDirection: 'row', height: 50 }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <TouchableOpacity style={{ height: 40 }} onPress={onPress}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                marginTop: 5,
              }}
            >
              Delivery instructions (optional )
            </Text>
            <Text style={{ marginTop: 10, marginBottom: 4 }}>
              {deliveryInstruction}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 35,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Icon
            type='ionicon'
            name='chevron-forward-outline'
            color='tomato'
            size={30}
          />
        </View>
      </View>
    </View>
  );
};

export default DeliveryInstructions;
