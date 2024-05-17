import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
//import { Image } from "react-native-elements";
import WalletItem from './components/WalletItem';
import { useNavigation } from '@react-navigation/native';
import AddPaymentMethod from './AddPaymentMethod';
import { farmDirectApi } from '../../Api/services/FarmDirectApi';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from './../components/controls/Collapse';

type Props = {};

const WalletScreen = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const [userWallet, setUserWallet] = React.useState([]);
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);

  React.useEffect(() => {
    const loadWallet = async (id: string) => {
      const data = await farmDirectApi.loadUserPayMethods(id);

      setUserWallet(data);
    };
    if (authorization) {
      loadWallet(authorization.userInfo.id);
      console.log('userWallet', userWallet);
    } else {
      console.log('else', userWallet);
    }
  }, [authorization]);

  //let loadWallet = async () => {
  //  const response = await farmDirectApi.loadUserPayMethods(22);
  //  if (response.status >= 200 && response.status < 300) {
  //    setUserWallet(response.data);
  //  }
  //};
  const handlePress = () => {
    // setShowModal(true);
    // console.log(showModal);
    navigation.navigate('PaymentMethod');
  };
  const renderItems = ({ item }) => {
    return (
      <Collapse title={item.method}>
        <WalletItem
          cardType={item.method}
          paymentMethod={item.method + item.methodNumber}
          onPress={() => handlePress}
        />
      </Collapse>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={userWallet}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={({ item }) => (
          <WalletItem
            cardType={item.method}
            paymentMethod={item.methodNumber}
            onPress={() => handlePress}
          />
        )}
      />

      {/*<AddPaymentMethod
          modalVisible={showModal}
          onClose={() => setShowModal(false)}
        />*/}
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    fontFamily: 'OpenSansSemiBold',
    fontSize: 32,
    fontWeight: '700',
  },
  h2: {
    paddingHorizontal: 18,
    fontFamily: 'OpenSansSemiBold',
    fontSize: 24,
    fontWeight: '600',
  },
});
