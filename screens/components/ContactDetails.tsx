import { Formik } from 'formik';
import React, { ReactElement } from 'react';
import { Button } from '@rneui/themed';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/global';
import * as Yup from 'yup';

interface Props {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}

const ContactDetails = ({}: Props) => {
  const SignUpSchema = Yup.object().shape({
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
    city: Yup.string()
      .min(3, 'City must be at least 3 letters')
      .required('City is required'),
  });
  return (
    <View style={globalStyles.content}>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          city: '',
        }}
        validationSchema={SignUpSchema}
        validate={(errors) => {}}
        onSubmit={(values) => {
          console.log(values);
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
              maxLength={10}
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
              maxLength={10}
            />
            <Text style={styles.errorStyles}>
              {touched.city && errors.city}
            </Text>

            <View style={{ marginVertical: 30 }}>
              <View style={{ height: 200 }}>
                <Text style={{ color: 'green' }}>
                  This is information will be used to contact you about
                  important issues including future purchases and deliveries
                  with Farms Direct; We do not share your personal details.
                </Text>
              </View>
              <Button
                title='Next!'
                // isBusy={isLoading}
                disabled={isSubmitting}
                //  onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default ContactDetails;
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
