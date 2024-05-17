import { View, StyleSheet } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import Constants from 'expo-constants'

type Props = {
    messageType: 'HTML' | 'TEXT' | 'URI'
    content?: string
    uri?: string
}

const MessageDetails = ({ messageType }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                style={styles.container}
                originWhitelist={['*']}
                source={{ uri: 'https://jw.org' }}
                //source={{ html: '<h1><center>Hello world</center></h1>' }}
            />
        </View>
    )
}

export default MessageDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
    },
})
