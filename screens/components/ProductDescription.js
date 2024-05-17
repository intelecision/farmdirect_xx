import React from 'react';
import { Text, View, Image, Platform, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from '@rneui/themed';
import HeaderTitle from './HeaderTitle';

const ProductDescription = ({ product, onPress, onCookingTipsPress }) => {
  const imageUri =
    'http://otuofarms.com/farmdirect/images/' + product.farm.imageUri.trim();

  return (
    <View>
      <View
        style={{
          borderBottomWidth: 0.5,
          //  borderBottomColor: "#dddddd",
          paddingTop: 20,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: '700',
            fontFamily: 'Roboto',
            fontSize: 20,
          }}
        >
          Description
        </Text>

        <Text style={{ paddingBottom: 10, paddingTop: 5, marginBottom: 5 }}>
          {product.description}
        </Text>

        <Text
          style={{
            fontWeight: '700',
            fontFamily: 'Roboto',
            fontSize: 20,
          }}
        >
          The Farmer Says
        </Text>

        <Text style={{ paddingBottom: 10, paddingTop: 5, marginBottom: 5 }}>
          {product.storyFromFarmer}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#dddddd',
          minHeight: 50,
          // marginTop: 10,
        }}
      >
        <TouchableOpacity underlayColor='#DDDDDD' onPress={onPress}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: '700',
                  color: '#204B24',
                }}
              >
                Storage Information
              </Text>
            </View>
            <View
              style={{
                width: 40,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <Icon name='chevron-forward-outline' type='ionicon' size={25} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/*<HeaderTitle title="Cooking instructions" onPress={onCookingTipsPress} />*/}

      <View
        style={{
          justifyContent: 'center',
          // alignItems: "center",
          borderBottomWidth: 0.5,
          // borderBottomColor: "#dddddd",
          // backgroundColor: "white",
          height: 50,
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={onCookingTipsPress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#204B24' }}>
                {'Cooking tips'}
              </Text>
            </View>
            <View style={{ width: 40, alignItems: 'flex-end' }}>
              <Icon
                name='chevron-forward-outline'
                type='ionicon'
                size={25}
                style={{
                  flex: 1,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: '700',
            marginTop: 10,
          }}
        >
          {'Meet the farmer'}
        </Text>
        <Image
          resizeMode={'stretch'}
          style={{
            height: 200,
            width: '100%',
            marginTop: 10,
            paddingBottom: 10,
            // backgroundColor: "white",
          }}
          source={{ uri: imageUri }}
        />
        <Text
          style={{ textAlign: 'justify', paddingBottom: 10, paddingTop: 5 }}
        >
          {product.farm.narrative}
        </Text>
      </View>
    </View>
  );
};

export default ProductDescription;
