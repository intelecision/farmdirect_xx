import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorizationActions from './../redux/actions/authorizationAction';
import Button from './components/controls/Button';

const AccountDetailScreen = ({ route, navigation, ...props }) => {
  const { authActions, authorization } = props;
  const [userInfo, setUserInfo] = useState(authorization.userInfo);

  const renderListItem = (label, text, iconName) => {
    if (label && label === 'Name') isName = true;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ContactDetails', {
            userInfo: userInfo,
          })
        }
      >
        <View
          style={{
            flexDirection: 'row',
            minHeight: 60,
            borderWidth: 0.5,
            borderColor: '#ddd',
            // paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <FontAwesome
            name={iconName}
            size={20}
            color='gray'
            style={{ marginRight: 15, paddingHorizontal: 10 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', marginBottom: 4, marginTop: 10 }}>
              {label}
            </Text>
            <Text style={{ marginBottom: 10 }}>{text}</Text>
          </View>
          <FontAwesome
            name='angle-right'
            size={30}
            color='gray'
            style={{ marginRight: 15, justifyContent: 'flex-end' }}
          />
        </View>
      </Pressable>
    );
  };

  const changePassword = () => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ACCOUNT', {
            screen: 'ChangePassword',
            params: { userInfo: userInfo },
          })
        }
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            borderWidth: 0.5,
            borderColor: '#ddd',
            // paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <FontAwesome
            name='lock'
            size={20}
            color='gray'
            style={{ marginRight: 15, paddingHorizontal: 10 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', marginBottom: 4 }}>
              Change you password
            </Text>
          </View>
          <FontAwesome
            name='angle-right'
            size={30}
            color='gray'
            style={{ marginRight: 15, justifyContent: 'flex-end' }}
          />
        </View>
      </Pressable>
    );
  };

  const YourAddresses = () => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Modal', { screen: 'YourAddresses' })
        }
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            borderWidth: 0.5,
            borderColor: '#ddd',
            // paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Ionicons
            name='location-sharp'
            size={20}
            color='gray'
            style={{ marginRight: 15, paddingHorizontal: 10 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', marginBottom: 4 }}>
              Addresses
            </Text>
          </View>
          <FontAwesome
            name='angle-right'
            size={30}
            color='gray'
            style={{ marginRight: 15, justifyContent: 'flex-end' }}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Text style={{ padding: 10 }}>Personal details</Text>
      {renderListItem(
        'Contact details',
        `${userInfo.firstName} ${userInfo?.lastName} \n${userInfo.username}, ${userInfo.phoneNumber}`,
        'address-card'
      )}

      {changePassword()}
      <View>{YourAddresses()}</View>
      <View
        style={{
          marginVertical: 60,
          paddingHorizontal: 30,
          //justifyContent: 'center',
          // alignItems: 'flex-end',
        }}
      >
        <Button
          title='DELETE ACCOUNT'
          onPress={() =>
            navigation.navigate('Modal', { screen: 'DeleteAccount' })
          }
        />
      </View>
    </View>
  );
};
function mapStateToProps(state) {
  return {
    authorization: state.authorization,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authorizationActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailScreen);

const styles = StyleSheet.create({});
