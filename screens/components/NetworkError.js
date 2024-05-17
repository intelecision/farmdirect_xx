import { Button } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import { Button, Image } from '@rneui/themed'
import { getImageSource } from '../../utils/helpers'

const NetworkError = () => {
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    paddingHorizontal: 20,
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={{ uri: getImageSource('network_error.png') }}
                    size={80}
                    resizeMode="cover"
                />
                <Text style={{ marginTop: 10 }}>
                    No network connection,.Please check your Mobile data and
                    network settings and retry
                </Text>
                <Button title="Try Again" />
            </View>
        </View>
    )
}

export default NetworkError
