import React, { useState, useEffect } from 'react';
import {
  Share,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { Button, Icon } from '@rneui/themed';
//import { retrieveItem } from "../utils/localStorage";

const FriendsAndFamilyScreen = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const { aUserInfo } = route.params.user;
  useEffect(() => {
    setUser(aUserInfo);

    return () => {};
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          ' Please download and shop at Farm Direct and get Ghc30 in voucher. \n\n' +
          ' Voucher code ' +
          user.phoneNumber +
          '\n\nApple and Android devices',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ScrollView scrollEventThrottle={16}>
      <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
        <View style={{ flex: 1, marginBottom: 20, backgroundColor: 'white' }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.H1}>
              Invite your friends and family to Farms Direct.
              <Text> You both receive GH₵30</Text>
            </Text>
          </View>
          <View style={styles.bodyContent}>
            <Text style={styles.bodyText}>
              Share your unique code with your friends and family, and you both
              get GH₵30 each in vouchers when they complete their first
              successful purchase of GH₵150 or more
            </Text>
          </View>

          <View>
            <View
              style={{
                justifyContent: 'center',
                height: 46,
                margin: 30,
                backgroundColor: '#f8f8fa',
              }}
            >
              <Text style={styles.code}>{user.phoneNumber}</Text>
            </View>
            <View style={{ margin: 26, justifyContent: 'space-between' }}>
              <Button
                icon={
                  <Icon
                    type='ionicon'
                    name='share-social-outline'
                    size={30}
                    color='white'
                  />
                }
                //  iconRight
                buttonStyle={{ backgroundColor: 'tomato' }}
                titleStyle={{ marginHorizontal: 20 }}
                title='Share with friends'
                onPress={onShare}
              />
              <Button
                containerStyle={{ marginTop: 20 }}
                type='outline'
                buttonStyle={{
                  backgroundColor: '#fff',
                  borderColor: 'tomato',
                }}
                titleStyle={{ marginHorizontal: 20, color: 'tomato' }}
                title='Reward your family or friend'
                onPress={() => navigation.navigate('RedeemInvite')}
              />
            </View>
          </View>
        </View>
        {/*<View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingTop: 20,
          }}
        >
          <Text style={{ textAlign: "center" }}>Total Earnings</Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 32,
              fontWeight: "700",
            }}
          >
            GH₵0.00
          </Text>

          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>Total referred</Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              {0}
            </Text>
          </View>
        </View>*/}
      </View>
    </ScrollView>
  );
};

export default FriendsAndFamilyScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'tomato',
  },
  H1: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
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
