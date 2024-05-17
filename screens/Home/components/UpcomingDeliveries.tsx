import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

type Props = {
  upcomingDeliveries?: boolean;
  onPress: () => void;
};

const UpcomingDeliveries = ({ upcomingDeliveries, onPress }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginVertical: 10 }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            <Icon
              name='calendar-alt'
              size={30}
              type='font-awesome-5'
              color='tomato'
            />
            <Text style={{ marginLeft: 20 }}>Upcoming Deliveries</Text>
          </View>
          <View style={{ width: 40, alignItems: 'flex-end' }}>
            <Icon name='chevron-forward' type='ionicon' color='tomato' />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default UpcomingDeliveries;

const styles = StyleSheet.create({});
