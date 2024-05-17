import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ImageSourcePropType,
    TouchableOpacity,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

interface Props {
    imageUri: ImageSourcePropType
    title: string
    story: string
    onTabbed: () => void
}

const LandingPage = ({ title, story, imageUri, onTabbed }: Props) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={0.95} onPress={onTabbed}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.welcomeImage}
                    source={imageUri}
                    borderRadius={10}
                />
                <View style={styles.narrative}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.story}>{story}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    container: {
        height: 400,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        fontFamily: 'Philosopher',
    },
    story: {
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'auto',
        fontFamily: 'Roboto',
    },
    narrative: {
        backgroundColor: 'white',
        padding: 20,
    },
    welcomeImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#dddddd',
    },
})
