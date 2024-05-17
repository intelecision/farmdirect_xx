import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { greenTomatoes, lightTomatoes } from '../../constants/colours';
import { ScrollView } from 'react-native-gesture-handler';
//mport Icon from "react-native-vector-icons"

export default function OrderStatus() {
  StraightLine = () => {
    return (
      <View
        style={{
          marginLeft: 9,
          marginTop: 0,
          height: 30,
          width: 3,
          backgroundColor: greenTomatoes,
          justifyContent: 'center',
        }}
      />
    );
  };
  const OrderStatusStage = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'red' }}>
        {/*<View style={{height:40,marginTop:10, borderLeftColor: "green", borderLeftWidth: 4 }} />*/}
        <View style={{ flex: 1, margin: 10, backgroundColor: 'yellow' }}>
          <Text style={{ fontWeight: '700' }}>Order received</Text>
          <Text style={{ color: 'gray' }}>26 May 2022, 12:22</Text>
        </View>
      </View>
    );
  };
  const Section = () => {
    return (
      <View>
        <View style={{}}>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Icon
              type='material'
              name='check-circle'
              size={20}
              color='tomato'
            />
            <Text style={{ marginLeft: 10 }}>Order received</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 1 }}>
            <StraightLine />
            <Text style={{ marginLeft: 20 }}>Thu 12/12/2022</Text>
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              type='material'
              name='check-circle'
              size={20}
              color='tomato'
            />
            <Text style={{ marginLeft: 10 }}> Processing</Text>
          </View>
        </View>
        <StraightLine />
        <View style={{ flexDirection: 'row' }}>
          <Icon type='material' name='circle' size={20} color='gray' />
          <Text style={{ marginLeft: 10 }}>Dispatched</Text>
        </View>
        <StraightLine />
        <View>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <Icon type='material' name='circle' size={20} color='gray' />
            <Text style={{ marginLeft: 10, fontWeight: '700' }}>
              Delivered successfully
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 1 }}>
            <Text style={{ marginLeft: 30, marginTop: -10 }}>
              Thu 12/12/2022
            </Text>
          </View>
        </View>
        <Text>Delivered to Mr Seth Kwarteng</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/*<ScrollView style={{flex:1}}>*/}
      {/*<Section />*/}
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          marginTop: 10,
          //  backgroundColor: "red",
        }}
      >
        <View
          style={{
            // height: 40,
            // marginTop: 10,
            borderLeftColor: 'green',
            borderLeftWidth: 2,
          }}
        />

        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: '700' }}>Order received</Text>
          <Text style={{ color: 'gray' }}>26 May 2022, 12:22</Text>
        </View>
      </View>
      {/*</ScrollView>*/}
    </View>
  );
}

const styles = StyleSheet.create({});
