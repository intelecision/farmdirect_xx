import { Text, View } from 'react-native'

import axios from 'axios'
import { saveToStore } from './../utils/localStorage'
import AddressCard from './components/AddressCard'
import { getServiceEndpoint } from './../Api/services/servicesApi'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { loadAddresses } from '../redux/actions/addressesAction'

export const StoredAddresses = () => {
    const navigation = useNavigation()
    const authorization = useSelector((state) => state.authorization)
    const addresses = useSelector((state) => state.addresses)
    const dispatch = useDispatch()
    const [selectedId, setSelectedId] = useState()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (authorization.isAuthorized) {
            setUserInfo(authorization.userInfo)
        }
        dispatch(loadAddresses(userInfo.id, userInfo.token))
    }, [])

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.handleSelection(item.id)}>
                <View>
                    <AddressCard
                        item={item}
                        onEditPress={() => this.handleEditPress(item)}
                        onDeliveryPress={() => this.handelDefault(item)}
                        selected={selectedId}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: selectedId === null ? 'white' : '#f5f5f5',
                //selected ? styles.selected : styles.content
            }}
        >
            <FlatList
                keyExtractor={(item) => item.id.tostring()}
                data={addresses}
                refreshing={refreshing}
                extraData={selectedId}
                renderItem={renderItem}
            />

            <View style={{ height: 80, marginBottom: 10 }}>
                <Button
                    icon={{
                        name: 'add',
                        size: 15,
                        color: 'white',
                    }}
                    title="Add new address"
                    buttonStyle={{ backgroundColor: 'tomato' }}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginHorizontal: 20,
                        height: 90,
                    }}
                    onPress={() => navigation.navigate('DeliveryAddress')}
                />
            </View>
        </View>
    )
}

export default StoredAddresses
