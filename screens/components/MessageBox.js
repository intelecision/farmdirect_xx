import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { Button } from '@rneui/themed';
import { lightTomatoes } from './../../constants/colours';

const MessageBox = ({ showDialog = false, message, onClose }) => {
  const { width, height } = useWindowDimensions();
  return (
    <Modal
      animationType='slide'
      visible={showDialog}
      // transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: lightTomatoes,
          opacity: 0.75,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: width - 20,
            minHeight: 160,
            borderColor: '#fafafa',
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: '400',
                textAlign: 'justify',
                marginBottom: 20,
                textAlign: 'auto',
              }}
            >
              {message}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Button
              title='OK'
              buttonStyle={{ backgroundColor: 'tomato' }}
              style={{
                width: '100%',
                height: 40,
                marginVertical: 20,
                justifyContent: 'flex-end',
                //alignItems: "flex-end",
              }}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MessageBox;

const styles = StyleSheet.create({});
