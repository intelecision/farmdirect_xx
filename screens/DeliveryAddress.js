import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Address } from './../Models/businessLayer';
import { Button, Header } from '@rneui/themed';
import { globalStyles } from './../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderLeftArrow from './../components/HeaderLeftArrow';
import axios from 'axios';
import { getServiceEndpoint } from './../Api/services/servicesApi';

import * as deliverToAddressAction from '../redux/actions/deliveryAddressAction';
import * as addressesActions from '../redux/actions/addressesAction';
import { bindActionCreators } from 'redux';

const DeliveryAddress = ({ route, navigation, ...props }) => {
  const {
    authorization,
    deliveryAddress,
    actionAddresses,
    deliverToAddressAction,
  } = props;
  const [addressToEdit, setAddressToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [address, setAddress] = useState(() => {
    if (route.params) {
      const { editAddress } = route.params;
      // setAddressToEdit(editAddress);
      return {
        firstName: editAddress.firstName,
        lastName: editAddress.lastName,
        phoneNumber: editAddress.mobile,
        streetName: editAddress.streetName,
        town: editAddress.town,
        digitalAddress: editAddress.digitalAddress,
        addressNickname: editAddress.nickName,
        deliveryInstruction: editAddress.deliveryInstruction,
      };
    } else {
      return {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        streetName: '',
        town: '',
        digitalAddress: '',
        addressNickname: '',
        deliveryInstruction: '',
        city: '',
      };
    }
  });
  const [deliveryInstruction, setDeliveryInstruction] = useState(
    'Notify me about 1 hour before delivery'
  );
  const [inputLength, setInputLength] = useState(170);

  /// validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'First name must be more than 3 letters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(3, 'Last name must be more than 3 letters')
      .required('Last name is required'),
    phoneNumber: Yup.string()
      .min(3, 'Phone number must be more than 3 letters')
      .required('Phone number is required'),
    streetName: Yup.string()
      .min(3, 'Street name must be more than 3 letters')
      .required('Street name is required'),
    addressNickname: Yup.string()
      .min(3, 'Nickname must be at least 8 characters!')
      .required('Nickname is required'),
    town: Yup.string()
      .min(3, 'Town entered is not valid')
      .required('Town  required'),
  });
  const textChange = (text) => {
    const maxLength = 170;

    setInputLength(maxLength - text.length);
    setDeliveryInstruction(text);
  };

  const handleLeftArrow = () => {
    navigation.goBack();
  };
  const saveAddress = (values) => {
    const { userInfo } = authorization;
    const access_token = userInfo.token;
    const userId = userInfo.id;
    let data = new Address();
    data.firstName = values.firstName;
    data.lastName = values.lastName;
    data.mobile = values.phoneNumber;
    data.streetName = values.streetName;
    data.town = values.town;
    data.digitalAddress = values.digitalAddress;
    data.nickName = values.addressNickname;
    data.userId = userInfo.id;
    data.IsDefaultAddress = true;
    data.city = values.city;
    data.Longitude = 0;
    data.Latitude = 0;

    if (route.params) {
      const { editAddress } = route.params;

      data.userId = editAddress.userId;
      data.id = editAddress.id;
    }
    setIsLoading(true);
    axios
      .post(getServiceEndpoint('address/Post'), data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setIsLoading(false);
          setShowModal(true);
          actionAddresses.loadAddresses(userId, access_token);
          deliverToAddressAction.updateDeliveryAddress(data);
          navigation.goBack();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Error from saving delivers \n', error);
        Alert.alert('Sorry', 'Something went wrong. Please try again');
      });
  };
  const handleClose = () => {
    navigation.navigate('PlaceOrder');
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={address}
        validationSchema={validationSchema}
        loadBasket
        onSubmit={(values, actions) => {
          saveAddress(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView
            style={[globalStyles.content, { paddingVertical: 20 }]}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <KeyboardAvoidingView
              behavior='padding'
              enabled
              keyboardVerticalOffset={0}
              style={{ flex: 1, marginVertical: 20 }}
            >
              <View
                style={{
                  flex: 1,
                  margin: 10,
                  borderColor: 'gray',
                  paddingBottom: 20,
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='First name'
                    shake={true}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.firstName && errors.firstName}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='Last name'
                    shake={true}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.lastName && errors.lastName}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    keyboardType='number-pad'
                    returnKeyType='done'
                    placeholder='Mobile number'
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.phoneNumber && errors.phoneNumber}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='Street name'
                    errorStyle={{ color: 'red' }}
                    value={values.streetName}
                    onChangeText={handleChange('streetName')}
                    onBlur={handleBlur('streetName')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.streetName && errors.streetName}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    errorStyle={{ color: 'red' }}
                    placeholder='Town e.g East Lagon'
                    value={values.town}
                    onChangeText={handleChange('town')}
                    onBlur={handleBlur('town')}
                  />
                  <Text style={styles.errorStyles}></Text>
                  <TextInput
                    style={globalStyles.input}
                    // errorStyle={{ color: "red" }}
                    placeholder='Accra'
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.city && errors.city}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='Digital address'
                    value={values.digitalAddress}
                    onChangeText={handleChange('digitalAddress')}
                    onBlur={handleBlur('digitalAddress')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.digitalAddress && errors.digitalAddress}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='Address nickname eg Home or Parents'
                    value={values.addressNickname}
                    onChangeText={handleChange('addressNickname')}
                    onBlur={handleBlur('addressNickname')}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.addressNickname && errors.addressNickname}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'justify',
                      paddingTop: 10,
                      //  margin: 10,
                      color: 'gray',
                    }}
                  >
                    Address nickname helps you to identify your delivery
                    address, eg. "Home , My Mother's address"
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 50,
                  }}
                >
                  <Text
                    style={{ marginTop: 10, fontSize: 18, fontWeight: '700' }}
                  >
                    Delivery instruction (optional)
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={{ marginLeft: 0, marginTop: 0 }}>
                    <Text>
                      Add useful information to help the delivery driver get
                      your order to the right place.
                    </Text>
                  </View>
                  <TextInput
                    style={[
                      globalStyles.input,
                      {
                        height: 150,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginTop: 10,
                        textAlign: 'left',
                        //padding: 4,
                        textAlignVertical: 'top',
                      },
                    ]}
                    multiline={true}
                    maxLength={170}
                    placeholder='Call me 30 minutes before delivery on 0242 1233 4543'
                    onChangeText={(text) => textChange(text)}
                    value={deliveryInstruction}
                    returnKeyType='done'
                  />
                  <Text style={{ textAlign: 'right', margin: 10 }}>
                    {inputLength} characters remaining
                  </Text>
                </View>
                <View style={{ height: 100, paddingVertical: 30 }}>
                  <Button
                    title='Save address'
                    buttonStyle={{ backgroundColor: 'tomato' }}
                    onPress={handleSubmit}
                    loading={isLoading}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    deliveryAddress: state.deliveryAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionAddresses: bindActionCreators(addressesActions, dispatch),
    deliverToAddressAction: bindActionCreators(
      deliverToAddressAction,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);

const styles = StyleSheet.create({
  errorStyles: {
    marginBottom: 6,
    marginTop: 2,
    marginLeft: 2,
    fontWeight: '400',
    color: 'crimson',
    fontSize: 13,
  },
});
