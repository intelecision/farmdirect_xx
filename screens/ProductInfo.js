import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import HeaderLeftText from "./../components/HeaderLeftText";
import { Header } from '@rneui/themed';
import HeaderLeftArrow from './../components/HeaderLeftArrow';

const ProductInfo = ({ navigation, route, ...props }) => {
  const [data, setData] = useState('');
  const [title, steTitle] = useState('');

  useEffect(() => {
    const { title, data } = route.params;
    steTitle(title);
    setData(data);
    return () => {};
  }, [title, data]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f8f8fa',
      }}
    >
      <Header
        leftComponent={
          <HeaderLeftArrow onNavigate={() => navigation.goBack()} />
        }
        centerComponent={{
          text: title,
          style: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          },
        }}
        rightComponent={null}
        containerStyle={{
          height: 120,
          backgroundColor: 'white',
          justifyContent: 'space-around',
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text
          style={{ paddingVertical: 20, fontSize: 16, textAlign: 'justify' }}
        >
          {data}
        </Text>
      </View>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({});
