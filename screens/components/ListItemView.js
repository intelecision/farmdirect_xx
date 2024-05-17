import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons/Ionicons';

const ListItemView = ({ list, onPress }) => {
  const setIcon = (name) => {
    if (name) return <Ionicons size={30} name={name} />;
    else return null;
  };
  return (
    <View>
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            Component={TouchableHighlight}
            bottomDivider
            onPress={() => onPress(item.id)}
          >
            {item.icon ? (
              <Icon type='ionicon' size={25} name={item.icon} />
            ) : null}
            {/*{setIcon(item.icon)}*/}
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default ListItemView;

const styles = StyleSheet.create({});
