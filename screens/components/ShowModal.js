import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Icon, Header } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
const ShowModal = ({ canShow, children, rightComponent, onClose }) => {
  return (
    <Modal
      animationType='slide'
      //transparent
      visible={canShow}
      onRequestClose={onClose}
    >
      <View
        style={{
          margin: 0,
          flex: 1,
          marginBottom: 0,
          marginTop: 40,
          backgroundColor: 'transparent',
        }}
      >
        <View style={styles.header}>
          <Icon name='close' size={25} onPress={onClose} />
          <Text>Header</Text>
          {rightComponent}
        </View>
        {children}
        <ScrollView>
          <View style={[styles.fake_box, { backgroundColor: '#222222' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#333333' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#444444' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#444444' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#222222' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#333333' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#444444' }]} />
          <View style={[styles.fake_box, { backgroundColor: '#444444' }]} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ShowModal;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    // shadowRadius: 10,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    backgroundColor: 'red',
    zIndex: 1000,
    elevation: 1000,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  fake_box: {
    height: 250,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
