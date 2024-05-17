import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Circle from './components/Circle';

type Props = {};

const HowWeWorkScreen = (props: Props) => {
  return (
    <ScrollView style={{ flex: 1, marginTop: 20 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Circle size={50}>
            <Text style={styles.text}>1</Text>
          </Circle>

          <View style={{ marginLeft: 20 }}>
            <Text style={styles.heading}>You place your order</Text>
            <Text style={styles.narrative}>
              Choose your delivery Slot on orders over Ghc 50
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Circle size={50}>
            <Text style={styles.text}>2</Text>
          </Circle>

          <View style={{ marginLeft: 20 }}>
            <Text style={styles.heading}>The farmer gathers your produce</Text>

            <Text style={styles.narrative}>
              Your items are fresh and made ready by the producer
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Circle size={50}>
            <Text style={styles.text}>3</Text>
          </Circle>

          <View style={{ marginLeft: 20 }}>
            <Text style={styles.heading}>Your order is packed</Text>

            <Text style={styles.narrative}>
              We receive your order and check for quality, we arrange to
              dispatch same day
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Circle size={50}>
            <Text style={styles.text}>4</Text>
          </Circle>

          <View style={{ marginLeft: 20 }}>
            <Text style={styles.heading}>Your order is delivered</Text>
            <Text style={styles.narrative}>
              From farmer to your door under 12 hours
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HowWeWorkScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'tomato',
    fontFamily: 'Philosopher_BoldItalic',
  },
  narrative: {
    flex: 1,
    // width: 320,
    paddingRight: 30,
    fontFamily: 'Roboto',
    // textAlign: 'justify',
  },
  heading: {
    fontFamily: 'OpenSansSemiBold',
    fontSize: 16,
  },
});
