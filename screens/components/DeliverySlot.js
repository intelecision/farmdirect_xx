import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';

const { width } = Dimensions.get('window');
const DeliverySlot = ({ timeSlot, showTitle = true, onPress }) => {
  let displayDate = '';
  if (
    timeSlot !== null &&
    timeSlot.date !== '' &&
    timeSlot.date !== undefined
  ) {
    displayDate = new Date(timeSlot.date).toString().slice(0, 10);
  }
  const canShowTitle = () => {
    if (showTitle) {
      return (
        <Text style={{ fontSize: 16, color: 'gray' }}>
          Your delivery slot:{' '}
        </Text>
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flex: 1, width: width - 20 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View style={{ justifyContent: 'center', width: 50, height: 80 }}>
            <Icon name='truck' type='font-awesome' color='tomato' size={30} />
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 10,
            }}
          >
            {showTitle ? (
              <Text style={{ fontSize: 16, color: 'gray' }}>
                Your delivery slot:
              </Text>
            ) : (
              <View />
            )}
            {timeSlot && timeSlot.date !== '' && timeSlot.date !== undefined ? (
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700' }}> {displayDate}</Text>
                <Text style={{ marginLeft: 5 }}> {timeSlot.slot}</Text>
              </View>
            ) : (
              <Text style={{ fontWeight: '700' }}>
                Choose your delivery slot
              </Text>
            )}
          </View>
          <View
            style={{
              // marginRight: 6,
              justifyContent: 'center',
              alignContent: 'flex-end',
              height: 80,
              //width: 30,
            }}
          >
            <Icon name='chevron-forward' type='ionicon' color='tomato' />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeliverySlot;

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderColor: '#dddddd',
    borderWidth: 0.25,

    alignItems: 'flex-start',

    marginBottom: 0,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
