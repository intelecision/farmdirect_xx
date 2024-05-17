import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListRenderItem,
} from 'react-native'
import React, { useEffect, useLayout, useLayoutEffect } from 'react'
import Circle from './components/Circle'
import { FlatList } from 'react-native-gesture-handler'
import { lightTomatoes } from './../constants/colours'
import { Ionicons } from '@expo/vector-icons'
import { useWindowDimensions } from 'react-native'
import { StatusBar } from 'react-native'
import { Message } from 'yup'
import Button from './components/controls/Button'
import { useNavigation } from '@react-navigation/native'
import { loadMessages } from '../Api/services/servicesApi'
import { isToday, getTime, lightFormat, format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveItem } from '../utils/localStorage'
import { loggedInUser } from '../redux/actions/authorizationAction'

type Props = {}
const messages = [
    {
        subject: '24V All-In-One solar power storage system-Ellia',
        date: new Date().toDateString(),
    },
    {
        subject: '24V All-In-One solar power storage system-Ellia',
        date: new Date(24 * 3600 * 1000).toDateString(),
    },
    {
        subject: '24V All-In-One solar power storage system-Ellia',
        date: new Date().toDateString(),
    },
]
export interface IMessage {
    body: string
    dateSent: Date
    from: string
    id: number
    messageType: string
    read: boolean
    readDate: null
    subject: string
    userId: string
}
//loadMessages
const MessagesScreen = () => {
    const navigation = useNavigation()
    //const { authorization } = useSelector((state: any) => state.authorization)
    const dispatch = useDispatch()
    const [messageList, setMessageList] = React.useState<IMessage[] | any>([])
    const [user, setUser] = React.useState<any>(
        retrieveItem('USER_INFO').then((res) => setUser(res))
    )
    const { height } = useWindowDimensions()

    const fetchMessages = async () => {
        const response = await loadMessages(user?.id)
        console.log('USER', user?.id)
        setMessageList(response)
    }

    useLayoutEffect(() => {
        fetchMessages()
    }, [user?.id])

    const formDate = (date: Date): string => {
        const thisDate = new Date(date)

        if (isToday(thisDate)) {
            return lightFormat(thisDate, 'hh:mm')
        } else {
            return format(thisDate, 'dd-MMM-yyyy')
        }
    }
    const renderItems = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 6,
                }}
            >
                <Circle />
                <View style={{ height: 40, width: '60%', marginTop: 8 }}>
                    <Text
                        numberOfLines={2}
                        allowFontScaling
                        style={{
                            marginHorizontal: 10,
                            textAlign: 'left',
                            fontFamily: 'OpenSansBold',
                            fontWeight: '700',
                        }}
                    >
                        {item.subject}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        //justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 8,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'left',

                            fontSize: 14,
                        }}
                    >
                        {formDate(item.dateSent)}
                    </Text>
                </View>
            </View>
        )
    }

    const Circle = () => {
        return (
            <View style={[styles.circle]}>
                <Ionicons name="mail-outline" size={24} />

                {/*<Ionicons name="mail-open-outline" size={24} />*/}
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ margin: 10 }}
                data={messageList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            height: height - 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/*<Ionicons name="mail-outline" size={50} />*/}
                        <Circle />
                        <Text>You have no messages</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default MessagesScreen
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: 'tomato',
        fontFamily: 'Philosopher_BoldItalic',
    },
    narrative: {
        flex: 1,
        // width: 320,
        paddingRight: 30,
        fontFamily: 'Roboto',
        // textAlign: 'justify',
    },
    heading: {
        fontFamily: 'OpenSansSemiBold',
        fontSize: 16,
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 50,

        borderColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightTomatoes,
        //height: size, width: size, borderRadius: 25
    },
})
