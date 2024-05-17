import { StyleSheet, View } from 'react-native'
import React from 'react'
import { lightTomatoes } from './../../constants/colours'

type Props = {
    size: number
}

const Circle: React.FC<Props> = React.memo(({ children, size }) => {
    //const {}

    return (
        <View
            style={[
                styles.circle,
                { height: size, width: size, borderRadius: size },
            ]}
        >
            {children}
        </View>
    )
})

export default Circle

const styles = StyleSheet.create({
    circle: {
        height: 8,
        width: 80,
        borderRadius: 80,
        //borderWidth: 2,
        borderColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightTomatoes,
    },
})
