import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Header, Image, Text } from '@rneui/themed';
import HeaderLeftArrow from './../../components/HeaderLeftArrow';
import { globalStyles } from './../../styles/global';
import Button from './../../screens/components/controls/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ForgottenPassword = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState(
    ' Enter your Email to receive instructions to reset your password'
  );

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email entered is not valid')
      .required('Email address required'),
  });

  const handleLeftArrow = () => {
    navigation.goBack();
  };
  const sendPassword = (email) => {
    const data = {
      EmailAddress: email,//.toLowerCase(),
    };

    setLoading(true);
    axios
      .post(
        'http://www.otuofarms.com/farmdirect/api/account/ForgotPassword',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        setMessage('This email address not registered');
      });
  };
  return (
    <View style={globalStyles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content' }}
        backgroundColor='white'
        centerComponent={
          <Text style={{ fontSize: 18, color: 'tomato' }}>
            Forgotten password
          </Text>
        }
        leftComponent={<HeaderLeftArrow onNavigate={handleLeftArrow} />}
      />

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
            // borderWidth: 1,
          }}
        />
        <Text style={{ textAlign: 'center', padding: 20 }}>{message}</Text>
      </View>
      <View style={globalStyles.content}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            setUserName(values.email);
            sendPassword(values.email);
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
            <View
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <TextInput
                style={globalStyles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType='email-address'
                placeholder='email: kofi@gmail.com'
              />
              <Text style={styles.errorStyles}>
                {touched.email && errors.email}
              </Text>

              <Button title='SUBMIT' isBusy={loading} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgottenPassword;

const styles = StyleSheet.create({
  errorStyles: {
    marginBottom: 10,
    marginTop: 6,
    fontWeight: 'bold',
    color: 'crimson',
  },
});
