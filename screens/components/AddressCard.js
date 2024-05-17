import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Button, CheckBox, Icon } from '@rneui/themed';
import { greenTomatoes, lightTomatoes } from './../../constants/colours';

const AddressCard = ({ item, onEditPress, onDeliveryPress, selected }) => {
  const isSelected = selected;
  return (
    <View style={styles.container}>
      <View style={item.id === selected ? styles.selected : styles.content}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',

            marginTop: 10,
          }}
        >
          <View>
            <Icon name='location-on' color='tomato' size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: item.id === selected ? 'black' : 'gray',
              }}
            >
              {item.nickName}
            </Text>
            <View style={{ flexDirection: 'column', marginBottom: 10 }}>
              <View>
                <Text style={styles.textStyle}>
                  {item.firstName + ' ' + item.lastName}
                </Text>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                <Text style={styles.textStyle}>{item.streetName}</Text>
                <Text style={styles.textStyle}>{item.town}</Text>
                <Text style={styles.textStyle}>{item.digitalAddress}</Text>
              </View>
            </View>

            {selected == item.id ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingTop: 10,
                  justifyContent: 'space-between',
                  paddingRight: 30,
                }}
              >
                <Button
                  title='Edit address'
                  type='outline'
                  onPress={onEditPress}
                  containerStyle={
                    {
                      // height: 60,
                    }
                  }
                  titleStyle={{ color: greenTomatoes, fontWeight: '500' }}
                />

                <Button
                  title='Use address'
                  type='outline'
                  onPress={onDeliveryPress}
                  containerStyle={{
                    marginLeft: 10,
                    // height: 60,
                  }}
                  titleStyle={{ color: 'tomato', fontWeight: '500' }}
                  // buttonStyle={{ backgroundColor: "tomato" }}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //minHeight: 90,
    borderBottomColor: '#b0b0b0',
    // borderBottomWidth: 0.25,
  },
  content: {
    flex: 1,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  selected: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  textStyle: { fontWeight: '400', color: 'gray', fontSize: 16 },
});
export default AddressCard;
