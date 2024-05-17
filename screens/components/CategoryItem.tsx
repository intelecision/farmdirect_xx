import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { lightTomatoes } from './../../constants/colours'

type Props = {
    name: string
    image: string
}

const CategoryItem = ({ name, image }: Props) => {
    const { width } = useWindowDimensions()
    const WIDTH = width / 2 - 10
    return (
        <View style={{ width: WIDTH, margin: 5 }}>
            <ImageBackground
                source={{ uri: image }}
                resizeMode="cover"
                style={{ height: 120 }}
                borderRadius={12}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/*<Text
            style={{
              fontFamily: 'Philosopher',
              fontSize: 24,
              color: 'hsl(306, 25%, 92%)',
            }}
          >
            {name}
          </Text>*/}
                </View>
            </ImageBackground>
            <View style={{ height: 30, marginTop: 10 }}>
                <Text
                    style={{
                        fontFamily: 'Philosopher',
                        fontSize: 18,
                        //  color: 'hsl(306, 25%, 92%)',
                    }}
                >
                    {name}
                </Text>
            </View>
        </View>
    )
}

export default CategoryItem
