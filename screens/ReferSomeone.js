import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image } from '@rneui/themed'

const ReferSomeone = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'tomato' }}>
            <View style={{ height: 400 }}>
                <Image
                    source={{ uri: getImageSource('gift-voucher.jpg') }}
                    resizeMode={'contain'}
                    style={{ width: '100%', height: 400 }}
                />
            </View>
            <View style={{ flex: 3, paddingHorizontal: 20 }}>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    Get Ghc30 and your your friend get Ghc £30 discount on
                    successful referrals on their first purchase
                </Text>
                <View style={{ paddingVertical: 20 }}>
                    <Button
                        title="Email"
                        style={{ margin: 6 }}
                        type="outline"
                        buttonStyle={{ borderColor: 'white' }}
                        titleStyle={{ color: 'white' }}
                    />
                    <Button
                        title="SMS"
                        style={{ margin: 6 }}
                        type="outline"
                        buttonStyle={{ borderColor: 'white' }}
                        titleStyle={{ color: 'white' }}
                    />
                    <Button
                        title="WhatsApp"
                        style={{ margin: 6 }}
                        type="outline"
                        buttonStyle={{ borderColor: 'white' }}
                        titleStyle={{ color: 'white' }}
                    />
                </View>
            </View>
        </View>
    )
}

export default ReferSomeone

const styles = StyleSheet.create({})
