import React, { ReactElement, useState } from 'react';
import { Formik } from 'formik';

import { Button } from '@rneui/themed';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { farmDirectApi } from '../Api/services/FarmDirectApi';

type ContactInfo = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  newEmailAddress: string;
  phoneNumber: string;
};

const ContactDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // const isName = route.params.isName;
  const { userInfo } = route.params;

  const [firstName, setFirstName] = useState<string>(userInfo.firstName);

  const contactSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'first name must be at least 3 letters')
      .required('first name is required'),
    lastName: Yup.string()
      .min(3, 'last name must be at least 3 letters')
      .required('last name is required'),
    phoneNumber: Yup.string()
      .min(10, 'Mobile number must be 10 numeric characters')
      .max(10)
      .required('Mobile number is required'),
    emailAddress: Yup.string()
      .min(3, 'email must be at least 3 letters')
      .required('email is required'),
  });
  const saveChanges = (values: ContactInfo) => {
    values.newEmailAddress = values.emailAddress;
    values.emailAddress = userInfo?.username;
    farmDirectApi
      .updateUser(values)
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View
      style={[
        globalStyles.content,
        { paddingTop: 20, backgroundColor: 'white' },
      ]}
    >
      <Formik
        initialValues={{
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          phoneNumber: userInfo?.phoneNumber,
          emailAddress: userInfo?.username,
        }}
        validationSchema={contactSchema}
        validate={(errors) => {}}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          saveChanges(values);
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
            }}
          >
            <View>
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
            </View>

            <View>
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
                onChangeText={handleChange('emailAddress')}
                onBlur={handleBlur('emailAddress')}
                value={values.emailAddress}
                placeholder='you@example.com'
                keyboardType='email-address'
              />
              <Text style={styles.errorStyles}>
                {touched.emailAddress && errors.emailAddress}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginVertical: 30,
                justifyContent: 'flex-end',
              }}
            >
              <View
                style={{
                  height: 200,
                  justifyContent: 'flex-end',
                  paddingBottom: 20,
                }}
              >
                <Text style={{ color: 'gray', fontSize: 16 }}>
                  This is information will be used to contact you about
                  important issues including future purchases and deliveries
                  with Farms Direct. We do not share your personal details.
                </Text>
              </View>
              <Button
                title='Submit'
                disabled={isSubmitting}
                containerStyle={{ height: 50 }}
                buttonStyle={{
                  height: 50,
                  backgroundColor: 'tomato',
                  borderRadius: 30,
                }}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default ContactDetailScreen;
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
