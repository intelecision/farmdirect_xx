import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';

import { Button, Header } from '@rneui/themed';
import HeaderLeftText from '../components/HeaderLeftText';
import * as timeSlotActions from '../redux/actions/timeSlotActions';
import * as deliveryAddressAction from '../redux/actions/deliveryAddressAction';
import { loadSlots } from '../utils/model/timeSlotRepository';
import { isTomorrow, addDays } from 'date-fns';
import SlotCalendarStrip from './components/SlotCalendarStrip';
import MessageBox from './components/MessageBox';

///begin  from here
const TimeSlotScreen = ({ route, navigation, ...props }) => {
  const {
    direction,
    actionDeliveryAddress,
    deliveryAddress,
    timeSlot,
    actionTimeSlot,
  } = props;
  const [slot, setSlot] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [IsNotSelected, setIsNotSelected] = useState(true);

  useEffect(() => {
    var tomorrow = addDays(new Date(), 1);
    actionDeliveryAddress.loadDeliveryAddress();
    setDate(tomorrow);
    async function fetchData() {
      const slotTimes = await loadSlots();
      setAllTimeSlots(slotTimes);
      //  console.log('slotTimes----', slotTimes);
    }
    fetchData();
    actionTimeSlot
      .loadTimeSlot()
      .then(() => {
        setSlot(timeSlot.slot);
        //   console.log('timeSlot----', timeSlot);
      })
      .catch((error) => {
        alert('failed to load time slot ' + error);
      });

    return () => {};
  }, []);

  const itemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 10, width: '100%', backgroundColor: '#f8f8fa' }} />
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            setSlot(item.slot);
            setDeliveryCost(item.cost);
            setIsNotSelected(false);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              height: 50,
            }}
          >
            <View style={{ flex: 3, margin: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                }}
              >
                {item.slot}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', margin: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  // fontWeight: "700",
                  alignSelf: 'flex-end',
                }}
              >
                ₵{item.cost}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handlePress = async () => {
    const timeSlot = { date, slot, deliveryCost };
    actionTimeSlot.updateTimeSlot(timeSlot);
    setDeliveryCost(timeSlot.deliveryCost);

    if (deliveryAddress && deliveryAddress.nickName) {
      navigation.navigate('Modal', {
        screen: 'ConfirmDeliverySlot',
        params: {
          deliveryAddress: deliveryAddress,
          timeSlot: timeSlot,
          deliveryInstruction: 'Call when delivery on its way to me',
          direction: direction,
        },
      });
    } else {
      navigation.push('DeliveryAddress');
    }
  };

  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          paddingHorizontal: 20,
          borderColor: 'tomato',
          borderWidth: 1,
        }}
      >
        <Text style={{ margin: 10, fontSize: 18, fontWeight: '700' }}>
          Before we deliver
        </Text>
        <Text style={{ marginBottom: 10 }}>
          We will notify you 1-hour by text or phone call on delivery day
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
      {deliveryAddress && deliveryAddress.nickName ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 60,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16 }}>
            To:
            <Text style={{ fontWeight: '700' }}>
              {deliveryAddress.nickName}, {deliveryAddress.town}
            </Text>
          </Text>
          <Button
            type='clear'
            title='Change'
            titleStyle={{ fontWeight: '700', color: 'tomato' }}
            onPress={() => {
              navigation.navigate('Modal', {
                screen: 'YourAddresses',
                params: { nextPage: 'goBack' },
              });
            }}
          />
        </View>
      ) : (
        <View />
      )}

      <SlotCalendarStrip
        date={date}
        onChange={(newDate) => {
          setDate(newDate);
          setSelectedDate(
            isTomorrow(newDate) ? 'Tomorrow' : newDate.toDateString()
          );
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={allTimeSlots}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          height: 55,
          margin: 20,
          marginBottom: 40,
        }}
      >
        <TouchableOpacity
          disabled={IsNotSelected}
          style={{ backgroundColor: 'tomato', height: 60, borderRadius: 10 }}
          onPress={() => handlePress()}
        >
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                marginLeft: 10,
                marginTop: 10,
                flexDirection: 'column',
              }}
            >
              <Text style={{ fontWeight: '600', color: 'white' }}>
                {selectedDate}
              </Text>
              <Text style={{ color: 'white' }}> {slot}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'right',
                  marginTop: 20,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Select this slot
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    justifyContent: 'center',
  },
  SectionHeader: {
    backgroundColor: '#EFEBE8',
    fontSize: 18,
    padding: 5,
    color: 'gray',
    fontWeight: '500',
  },
  SectionListItems: {
    fontSize: 17,
    padding: 6,
    margin: 10,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
});

function mapStateToProps(state) {
  return {
    timeSlot: state.timeSlot,
    deliveryAddress: state.deliveryAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionTimeSlot: bindActionCreators(timeSlotActions, dispatch),
    actionDeliveryAddress: bindActionCreators(deliveryAddressAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSlotScreen);
