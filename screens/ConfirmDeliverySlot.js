import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import { Button } from '@rneui/themed';
import { windowBackground, greenTomatoes } from './../constants/colours';
import { useNavigation, useRoute } from '@react-navigation/core';

const ConfirmDeliverySlot = ({ ...props }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { direction, deliveryAddress, deliveryInstruction, timeSlot } =
    route.params;
  const handleClose = () => {
    if (direction === 'Home') navigation.navigate('Tabs', { screen: 'Home' });
    else {
      navigation.navigate('Tabs', { screen: 'TROLLEY' });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: windowBackground,
      }}
    >
      {/*<Header
        centerComponent={{
          text: " Delivery details",
          style: {
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
          },
        }}
        containerStyle={{
          backgroundColor: "white",
          justifyContent: "space-around",
        }}
      />*/}
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 260 }}>
            <ImageBackground
              style={styles.imageStyle}
              height={250}
              width={350}
              resizeMode='contain'
              source={require('../assets/images/fd_van.png')}
            />
          </View>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: '700',
              color: greenTomatoes,
            }}
          >
            Your delivery Slot reserved
          </Text>
          <View
            style={{
              height: 60,
              justifyContent: 'center',
              backgroundColor: 'tomato',
              margin: 10,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>
              To confirm your slot, complete your purchases before:
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                color: 'white',
              }}
            >
              12:00 pm today
            </Text>
          </View>

          <View style={styles.contentMain}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'column',
                backgroundColor: 'white',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 5,
                }}
              >
                Time slot details
              </Text>
              <Text style={{ fontWeight: '700', marginBottom: 5 }}>
                {new Date(timeSlot.date).toDateString()}
              </Text>
              <Text style={{ fontWeight: '700', marginBottom: 5 }}>
                {timeSlot.slot}
              </Text>
              <Text style={{ marginTop: 5, marginBottom: 5 }}>
                Delivery cost: GH₵{timeSlot.deliveryCost}
              </Text>

              <Text>Spend GH₵350 or more to qualify for free delivery</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'column',
                backgroundColor: 'white',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 5,
                }}
              >
                Delivery address
              </Text>
              <Text style={{ fontWeight: '700', marginBottom: 5 }}>
                {deliveryAddress.nickName}
              </Text>
              <Text> {deliveryAddress.streetName}</Text>
              <Text> {deliveryAddress.town}</Text>
              <Text> {deliveryAddress.digitalAddress}</Text>
            </View>
          </View>
          {/* </ScrollView> */}
          <View
            style={{
              justifyContent: 'center',
              height: 90,
              // backgroundColor: "tomato"
              borderTopWidth: 0.25,
              borderTopColor: 'gray',
            }}
          >
            <Button
              title='Continue shopping'
              buttonStyle={{
                margin: 30,
                height: 48,
                backgroundColor: 'tomato',
              }}
              onPress={() => handleClose()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ConfirmDeliverySlot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8fa',

    //  backgroundColor: "gray"
  },
  contentTop: {
    justifyContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: 10,
  },
  contentMain: {
    //paddingHorizontal: 20,
    //paddingVertical: 20
  },
  imageStyle: {
    flex: 1,
    marginTop: 1,
    // height: 260,
    width: '100%',
    resizeMode: 'contain',
    alignContent: 'center',
  },
  TextHeaderStyle: {
    fontWeight: '700',
    fontSize: 24,
    paddingHorizontal: 20,
  },
});
