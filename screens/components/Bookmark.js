import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from '@rneui/themed'

const Bookmark = ({ favourite = false, onToggle }) => {
    return (
        <View
            style={{
                height: 40,
                width: 40,
                marginLeft: 5,
                marginTop: 10,
                borderRadius: 30,
                justifyContent: 'center',
                backgroundColor: '#f2e4e1',

                elevation: 1000,
                position: 'absolute',
            }}
        >
            <Icon
                type="font-awesome"
                name={favourite ? 'heart' : 'heart-o'}
                color="crimson"
                size={30}
                containerStyle={{ elevation: 1000 }}
                onPress={onToggle}
            />
        </View>
    )
}

export default Bookmark

const styles = StyleSheet.create({})
