import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from '@rneui/themed';
//import { globalStyles } from "../styles/global";
import { globalStyles } from './../../styles/global';

const IconTextInput = ({
  iconName,
  value,
  onChangeText,
  iconType,
  maxLength,
  ...props
}) => {
  if (!iconName) iconName = 'help';
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 0.25,
        height: 40,
        margin: 4,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        backgroundColor: 'white',
        borderRadius: 4,
      }}
    >
      <Icon
        type={iconType}
        name={iconName}
        size={30}
        color='#d3d3d3'
        style={{ padding: 6 }}
      />
      <TextInput
        placeholder
        onChangeText={onChangeText}
        value={value}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        autoCompleteType='cc-number'
        style={styles.input}
      />
    </View>
  );
};

export default IconTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    //margin: 4,
    padding: 10,
  },
});
