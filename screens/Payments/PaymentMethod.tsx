import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WalletItem from './components/WalletItem';
import { ScrollView } from 'react-native';
import { farmDirectApi } from './../../Api/services/FarmDirectApi';
import { FlatList } from 'react-native-gesture-handler';

type Props = {};

const PaymentMethod = (props: Props) => {
  const [wallet, setWallet] = React.useState([]);

  React.useEffect(() => {
    // loadWallet();

    return () => {};
  }, []);

  const loadWallet = async () => {
    const response = await farmDirectApi.loadUserPayMethods(22);
    if (response.status >= 200 && response.status < 300) {
      setWallet(response.data);
    }
  };
  return (
    <ScrollView scrollEventThrottle={16} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: 40,
          marginHorizontal: 10,
        }}
      >
        {/*<FlatList data={wallet} keyExtractor ={(item, index)=> index.toString()} renderItem=/>*/}

        <View>
          <WalletItem
            paymentMethod='Mobile Money'
            cardType='mtn'
            onPress={() => null}
          />
          <WalletItem
            paymentMethod='Credit Card'
            cardType='visa'
            onPress={() => {}}
          />
          <WalletItem
            paymentMethod='Express Pay'
            cardType='expresspay'
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
