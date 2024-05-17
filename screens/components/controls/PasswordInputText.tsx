import React, { useEffect, useState } from 'react';
import { View, TextInput, TextInputProps, TextStyle } from 'react-native';
import { Icon } from '@rneui/themed';
import { globalStyles } from '../../../styles/global';

interface Props {
  value: string;
  onChangeText(): void;
  onBlur(): void;
  style: TextStyle;
  placeholder: string;
}

const PasswordInputText = (props: Props) => {
  const { placeholder, value, style, onBlur, onChangeText } = props;
  const [iconName, setIconName] = useState('eye');
  const [isPassword, setIsPassword] = useState(true);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        height: 40,
        margin: 4,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        // backgroundColor: "white",
        borderRadius: 6,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          autoCapitalize='none'
          placeholder={placeholder}
          style={{ fontSize: 15, height: 30, padding: 4, color: 'gray' }}
          secureTextEntry={isPassword}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>

      <View
        style={{
          padding: 8,
          width: 50,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Icon
          type='font-awesome-5'
          name={iconName}
          size={20}
          color='gray'
          onPress={() => {
            if (iconName === 'eye') {
              setIconName('eye-slash');
              setIsPassword(false);
            } else if (iconName === 'eye-slash') {
              setIconName('eye');
              setIsPassword(true);
            }
          }}
        />
      </View>
    </View>
  );
};

export default PasswordInputText;

//const styles = new StyleSheet({
//  input: {
//    height: 40,
//    //margin: 4,
//    padding: 10,
//  },
//});
