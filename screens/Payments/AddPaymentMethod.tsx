import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import WalletItem from './components/WalletItem';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '@rneui/base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

type Props = {
  modalVisible: boolean;
  onClose: () => void;
};
const HEADER_HEIGHT = 90;
const AddPaymentMethod = ({ modalVisible, onClose }: Props) => {
  const navigation = useNavigation();

  const handleWalletItem = () => {
    console.log('b4 click');
    navigation.navigate('Payments', { screen: 'MobileMoney' });
    console.log('aft click');
  };
  return (
    <SafeAreaProvider>
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={onClose}
      >
        {/*header*/}

        <View
          style={{
            flexDirection: 'row',
            height: HEADER_HEIGHT,
            // backgroundColor: 'tomato',
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
              margin: 10,
              marginTop: 40,
            }}
          >
            <Pressable
              onPress={() => onClose()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                // margin: 20,
                // marginTop: 40,
              })}
            >
              <AntDesign
                name='close'
                size={25}
                color={'black'}
                style={{ marginRight: 20 }}
              />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              //  backgroundColor: 'red',
              marginTop: 30,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                alignItems: 'center',
                fontFamily: 'OpenSans',
                fontSize: 18,
              }}
            >
              Add payment method
            </Text>
          </View>
        </View>
        <ScrollView scrollEventThrottle={16} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              marginTop: 40,
              marginHorizontal: 10,
            }}
          >
            <View>
              <WalletItem
                paymentMethod='Mobile Money'
                cardType='mtn'
                onPress={() => handleWalletItem}
                //{
                //  navigation.navigate("Payments", { screen: "MobileMoney" });
                //}}
              />
              <WalletItem
                paymentMethod='Credit Card'
                cardType='visa'
                onPress={() => {}}
              />
              {/*<WalletItem paymentMethod="PayPal" cardType="PayPal" onPress={()=>{}} />*/}
              <WalletItem
                paymentMethod='Express Pay'
                cardType='expresspay'
                onPress={() => {}}
              />
              {/*<WalletItem paymentMethod="Bank Direct" cardType="Bank" onPress={()=>{}}  />*/}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaProvider>
  );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
