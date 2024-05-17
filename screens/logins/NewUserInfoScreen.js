import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { Header, Image } from '@rneui/themed';
import { globalStyles } from '../../styles/global';
import HeaderLeftArrow from '../../components/HeaderLeftArrow';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../components/controls/Button';
import { ScrollView } from 'react-native-gesture-handler';
import MessageBox from './../components/MessageBox';

const NewUserInfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  //const [isSubmitting, setSubmitting] = useState(true);
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'first name must be at least 3 letters')
      .required('first name is required'),
    lastName: Yup.string()
      .min(3, 'last name must be at least 3 letters')
      .required('last name is required'),
    phoneNumber: Yup.string()
      .min(10, 'Mobile number must be 10 numeric characters')
      .max(15)
      .required('Mobile number is required'),
    city: Yup.string()
      .min(3, 'City must be at least 3 letters')
      .required('City is required'),
  });
  const handleLeftArrow = () => {
    navigation.goBack();
  };
  return (
    <View style={globalStyles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content' }}
        backgroundColor='white'
        centerComponent={
          <Text style={{ fontSize: 18, color: 'tomato' }}>
            Registration details
          </Text>
        }
        leftComponent={<HeaderLeftArrow onNavigate={handleLeftArrow} />}
      />
      <KeyboardAvoidingView
        //  enabled={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: 20 }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}
          >
            <Image
              resizeMethod='scale'
              source={require('./../../assets/icon.png')}
              style={{
                height: 100,
                width: 100,
                marginBottom: 10,
                borderRadius: 100,
              }}
            />
          </View>

          <View style={globalStyles.content}>
            <Formik
              initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                city: '',
              }}
              validationSchema={SignupSchema}
              validate={(errors) => {}}
              onSubmit={(values, { setSubmitting }) => {
                setFirstName(values.firstName);
                setLastName(values.lastName);
                setPhoneNumber(values.phoneNumber);
                setSubmitting(false);
                navigation.navigate('Auth', {
                  screen: 'Register',
                  params: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    city: values.city,
                  },
                });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    // paddingHorizontal: 10,
                  }}
                >
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    placeholder='your first name'
                  />
                  <Text style={styles.errorStyles}>
                    {touched.firstName && errors.firstName}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    placeholder='your last name'
                  />
                  <Text style={styles.errorStyles}>
                    {touched.lastName && errors.lastName}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    placeholder='Mobile number'
                    keyboardType='number-pad'
                    returnKeyType='done'
                    maxLength={15}
                  />
                  <Text style={styles.errorStyles}>
                    {touched.phoneNumber && errors.phoneNumber}
                  </Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    placeholder='city eg Accra, Tema'
                  />
                  <Text style={styles.errorStyles}>
                    {touched.city && errors.city}
                  </Text>

                  <View style={{ marginTop: 30, marginBottom: 10 }}>
                    <Button
                      title='Next!'
                      // isBusy={isLoading}
                      disabled={isSubmitting}
                      onPress={handleSubmit}
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      navigation.replace('Tabs');
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'tomato',
                        fontWeight: '700',
                        margin: 10,
                      }}
                    >
                      Not now
                    </Text>
                  </Pressable>
                </View>
              )}
            </Formik>

            <View style={{ height: 200 }}>
              <Text style={{ color: 'green' }}>
                This is information will be used to contact you about important
                issues including future purchases and deliveries with Farms
                Direct. We do not share your personal details.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/*<MessageBox showDialog="true" message="test900 " onp/>*/}
    </View>
  );
};

export default NewUserInfoScreen;

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
