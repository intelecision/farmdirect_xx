import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Formik } from "formik";
import PasswordInputText from "./components/controls/PasswordInputText";
import { globalStyles } from "./../styles/global";
import * as Yup from "yup";
import axios from "axios";

import Button from "./components/controls/Button";

export default function ChangePasswordScreen({ navigation, route, ...props }) {
  const { userInfo } = route.params;

  const [loading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    currentPassword: Yup.string()

      .min(8, "Password must be at least 8 characters!")
      .required("Password is required"),

    newPassword: Yup.string()

      .min(8, "Password must be at least 8 characters!")
      .required("New password is required"),
    confirmPassword: Yup.string()

      .min(8, "confirm password must be at least 8 characters!")
      .required("confirm password is required")
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Confirmation password must match"
      ),
  });

  const changePassword = (values) => {
    const data = {
      emailAddress: userInfo.username,
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    setLoading(true);
    axios
      .post(
        "http://www.otuofarms.com/farmdirect/api/account/ChangePassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.isSuccessful) {
          Alert.alert("Password", "Your password was successfully changed", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          Alert.alert(
            "Password Error",
            "Your password could not be changed, please try again. Password must have at least one number, One uppercase, and must be 8 or more characters long ",
            [
              {
                text: "OK",
              },
            ]
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err.response.data);

        Alert.alert(
          "Password Error",
          "Your password could not be changed, please try again. Password must have at least one number, One uppercase, and must be 8 or more characters long ",
          [
            {
              text: "OK",
            },
          ]
        );
        //  throw err;
      });
  };

  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0,
            }}
          >
            <Image
              resizeMethod="scale"
              source={require("../assets/icon.png")}
              style={{
                height: 100,
                width: 100,
                marginBottom: 10,
                borderRadius: 100,
                // borderWidth: 1,
              }}
            />
          </View>

          <View style={[globalStyles.content, { paddingVertical: 20 }]}>
            <View
              style={{
                flex: 0.5,
                borderWidth: 0,
                // paddingTop: 20,
                borderColor: "#d3d3d3",
              }}
            >
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                  changePassword(values);
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
                    <PasswordInputText
                      placeholder="Current password"
                      onChangeText={handleChange("currentPassword")}
                      onBlur={handleBlur("currentPassword")}
                      value={values.currentPassword}
                    />
                    <Text style={styles.errorStyles}>
                      {touched.currentPassword && errors.currentPassword}
                    </Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Auth", {
                          screen: "ForgottenPassword",
                          params: { user: userInfo },
                        })
                      }
                      style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                      })}
                    >
                      <Text
                        style={{
                          alignSelf: "flex-end",
                          color: "tomato",
                          fontWeight: "bold",
                          margin: 10,
                        }}
                      >
                        Forgotten password?
                      </Text>
                    </Pressable>
                    <PasswordInputText
                      placeholder="New password"
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      value={values.newPassword}
                    />
                    <Text style={styles.errorStyles}>
                      {touched.newPassword && errors.newPassword}
                    </Text>
                    <PasswordInputText
                      placeholder="Confirm password"
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                    />
                    <Text style={styles.errorStyles}>
                      {touched.confirmPassword && errors.confirmPassword}
                    </Text>
                    <View style={{ marginTop: 20 }}>
                      <Button
                        title="SUBMIT"
                        isBusy={loading}
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
          {/*</ImageBackground>*/}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  errorStyles: {
    marginBottom: 6,
    marginTop: 2,
    marginLeft: 2,
    fontWeight: "400",
    color: "crimson",
    fontSize: 13,
  },
});
