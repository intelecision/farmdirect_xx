import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { lightTomatoes } from '../../constants/colours';
import { useSelector } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const CheckoutSuccess = () => {
  const salesOrder = useSelector((state) => state.salesOrder);
  const authorization = useSelector((state) => state.authorization);
  //console.log(authorization);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name='check-circle' size={70} color='tomato' />
        <Text
          style={{
            fontWeight: '700',
            marginTop: 20,
            marginBottom: 20,
            color: 'tomato',
            fontSize: 16,
          }}
        >
          Your order is pending. Waiting for payment to be confirmed
        </Text>
        <Text style={styles.text}> Order number {salesOrder.orderNumber}</Text>
        <Text style={styles.text}>
          Confirmation sent to {authorization.userInfo.username}
        </Text>
      </View>
    </View>
    //</TouchableWithoutFeedback>
  );
};

export default CheckoutSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTomatoes,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
});
