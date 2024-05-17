import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Input, Button } from '@rneui/themed';
import { RewardFriendsAndFamily } from './../Models/businessLayer';
import { retrieveItem } from '../utils/localStorage';

const RewardFriendScreen = ({ route, navigation, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [redeemCode, onChangeRedeemCode] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    bootstrap();
    return () => {};
  }, []);

  const bootstrap = async () => {
    retrieveItem('USER_INFO').then((data) => {
      setUserInfo(data);
    });
  };

  const handleReward = () => {
    if (!redeemCode) return;

    //let reward = new RewardFriendsAndFamily();
    //reward.userId = userInfo.id;
    //reward.referralCode = redeemCode;
    //reward.dateIntroduced = new Date();
    //reward.previousBalance = 0;
    //reward.currentBalance = 0;

    let reward = {
      userId: userInfo.id,
      referralCode: redeemCode,
      rewardAmount: 30,
      previousBalance: 0,
      currentBalance: 0,
    };

    rewardUpdate(reward);
  };
  const handleOk = () => {
    navigation.navigate('AccountTab');
  };
  const rewardUpdate = (data) => {
    axios
      .post('http://www.otuofarms.com/farmdirect/api/reward', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        Alert.alert(
          'Success',
          'Your Referral Code was accepted. You and your friend will each receive' +
            ' a voucher for the GH₵30 when you make your first purchase of GH₵100 and over ',
          [{ text: 'OK', onPress: () => handleOk() }]
        );
      })
      .catch((err) => {
        Alert.alert(
          'Failure',
          'Your Referral code was not  accepted. you have been referred  already ',
          [
            {
              text: 'OK',
              onPress: () => handleOk(),
            },
          ]
        );
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{ flex: 0.8, backgroundColor: 'tomato', paddingHorizontal: 20 }}
      ></View>
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <View>
          <Text style={{ fontSize: 28, textAlign: 'center', marginTop: 0 }}>
            Reward the person who invited you to Farm Direct shopping experience
          </Text>
          <Text>Enter your referral code and get GH₵30 voucher</Text>
        </View>
        <View
          style={{
            height: 45,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <TextInput
            style={{
              margin: 10,
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'justify',
              height: 40,
            }}
            placeholder='Enter the code here'
            onChangeText={(text) => onChangeRedeemCode(text)}
            value={redeemCode}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            buttonStyle={{ backgroundColor: 'tomato' }}
            titleStyle={{ marginHorizontal: 20 }}
            title='Reward'
            onPress={() => handleReward()}
          />
        </View>
      </View>
    </View>
  );
};

export default RewardFriendScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    margin: 10,
  },
  H1: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'justify',
  },
  bodyText: {
    textAlign: 'center',
  },
  code: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  bodyContent: {
    margin: 20,
  },
});
