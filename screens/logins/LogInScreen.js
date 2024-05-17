import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorizationActions from '../../redux/actions/authorizationAction';
import * as defaultAddressActions from '../../redux/actions/deliveryAddressAction';
import * as deliveryAddressesActions from '../../redux/actions/addressesAction';
import { useAsyncStorage } from './../../hooks/useAsyncStorage';
import PasswordInputText from './../components/controls/PasswordInputText';
import { Image } from '@rneui/themed';

const LogInScreen = ({ route, navigation, ...props }) => {
  const { authorization } = props;
  const [IncorrectLogin, setIncorrectLogin] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [storedValue, setValue] = useAsyncStorage('USER_INFO', null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disableLogin, setDisableLogin] = useState(true);
  ////
  const [user, onChange] = useState('');
  const [logInData, setLogInData] = useState({});
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [callback, setCallback] = useState('');

  useEffect(() => {
    getUserInfo();
    console.log(storedValue);
    return () => {};
  }, []);

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters!')
      .required('Password is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address required'),
  });

  const getUserInfo = () => {
    setUserInfo(storedValue);
    setValue(userInfo);
  };

  const handleLeftArrow = () => {
    navigation.goBack();
  };

  const greetings = () => {
    var hour = new Date().getHours();
    return (
      'Good ' +
      ((hour < 12 && 'Morning ') || (hour < 18 && 'Afternoon ') || 'Evening ') +
      firstName
    );
  };

  const loadAddress = () => {
    const {
      authorization,
      actionDeliveryAddresses,
      actionDefaultAddress,
      addressList,
    } = props;

    if (authorization.isAuthorized) {
      actionDeliveryAddresses.loadAddresses(
        authorization.userInfo.id,
        authorization.userInfo.token
      );

      if (addressList) {
        const defaultAddress = addressList.find((a) => {
          return a.isDefaultAddress === true;
        });
        actionDefaultAddress.updateDeliveryAddress(defaultAddress);
      }
    }
  };
  const handleRegister = () => {
    navigation.navigate('Auth', { screen: 'NewUserInfo' });
  };
  handleSignIn = () => {
    const { authActions } = props;

    setLoading(true);
    authActions
      .AuthenticateUser(username, password)
      .then(() => {
        setLoading(false);
        loadAddress();
        navigation.navigate('Tabs', { screen: 'FARM' });
      })
      .catch((err) => {
        if (err.response?.status === 400 || err.response?.status === 404) {
          setIncorrectLogin(true);
          setLoading(false);
        } else {
          setLoading(false);
          setIncorrectLogin(true);
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground
          source={require('./../../assets/farmsky.jpeg')}
          style={styles.image}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMethod='scale'
                source={require('./../../assets/icon.png')}
                style={{
                  height: 80,
                  width: 80,
                  marginBottom: 10,
                  borderRadius: 100,
                }}
              />
            </View>

            <View
              style={{
                flex: 0.5,
                paddingVertical: 20,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 36,
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                Shopping tailored
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 36,
                  fontWeight: '700',
                  color: 'white',
                }}
              >
                just for you
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#f4f4f4',
                }}
              >
                We are green. The future of energy
              </Text>
            </View>
            <View style={{ flex: 3, padding: 20 }}>
              <TextInput
                placeholder='Account email/mobile number'
                onChangeText={(text) => onChange(text)}
                style={styles.input}
                keyboardType='email-address'
                //value={user.toLowerCase()}
              />
              <Text style={{ color: 'crimson' }}>{user && error} </Text>
              <PasswordInputText
                placeholder='password'
                onChangeText={(text) => onChange(text)}
                style={styles.input}
                keyboardType='email-address'

                //value={user.toLowerCase()}
              />
              <Text style={{ color: 'crimson' }}>{user && error} </Text>
              <TouchableOpacity onPress={() => login()} activeOpacity={0.2}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    marginVertical: 20,
                    backgroundColor: '#204B24',
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    deliverToAddress: state.deliveryAddress,
    addressList: state.addresses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authorizationActions, dispatch),
    actionDefaultAddress: bindActionCreators(defaultAddressActions, dispatch),
    actionDeliveryAddresses: bindActionCreators(
      deliveryAddressesActions,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorStyles: {
    marginBottom: 10,
    marginTop: 6,
    fontWeight: 'bold',
    color: 'crimson',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e5efd7',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#222', //"#e5efd7",
    opacity: 0.4,
  },
  image: {
    flex: 1,
  },
});
