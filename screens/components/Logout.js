import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';

export default function Logout({ visible, onPress }) {
  return (
    <View>
      {visible && (
        <View style={{ paddingHorizontal: 20, margin: 20 }}>
          <Button
            title='Log out'
            type='outline'
            buttonStyle={{ borderColor: 'tomato' }}
            titleStyle={{ color: 'tomato' }}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
}
