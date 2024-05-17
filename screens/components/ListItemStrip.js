import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/themed';

const ListItemStrip = ({
  lineTitleText,
  lineTitleStyle,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
          <View style={[{ flex: 1 }]}>
            <Text style={[styles.lineText, lineTitleStyle]}>
              {lineTitleText}
            </Text>
          </View>
          <View
            style={{
              width: 40,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginEnd: 6,
            }}
          >
            <Icon
              name='chevron-forward-outline'
              type='ionicon'
              size={25}
              color='tomato'
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemStrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
  },
  lineText: { fontSize: 16 },
});
