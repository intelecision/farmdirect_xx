import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'

import { Header, Button, CheckBox } from '@rneui/themed'
import HeaderLeftArrow from './../components/HeaderLeftArrow'
import AddressCard from './components/AddressCard'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import * as defaultAddressActions from '../redux/actions/deliveryAddressAction'
import * as addressesActions from '../redux/actions/addressesAction'
import { getServiceEndpoint } from './../Api/services/servicesApi'
import { saveToStore } from './../utils/localStorage'

const DeliverToAddresses = ({ route, navigation, ...props }) => {
    const {
        authorization,
        listOfAddresses,
        deliverToAddress,
        actionAddresses,
        actionDefaultAddress,
    } = props
    const [refreshing, setRefreshing] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const [addresses, setAddresses] = useState([])

    useEffect(() => {
        const { userInfo } = authorization
        actionAddresses.loadAddresses(userInfo.id, userInfo.token)
        actionDefaultAddress.loadDeliveryAddress()

        //  loadAddress()
    }, [])

    const loadAddress = () => {
        const { userInfo } = authorization
        setRefreshing(true)
        const local =
            'https://localhost:44392/api/' +
            `address/GetAddressByUserId/${userInfo.id}`
        if (userInfo) {
            axios
                .get(
                    getServiceEndpoint(
                        `address/GetAddressByUserId/${userInfo.id}`
                    ),
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        let aa = response.data.find(findDefaultAddress)

                        if (aa) {
                            setSelectedId(aa.id)
                            actionDefaultAddress.updateDeliveryAddress(aa)
                        }

                        setAddresses(response.data)
                        setRefreshing(false)
                        saveToStore('ADDRESSES_KEY', response.data)
                    }
                })
                .catch((error) => {
                    console.log('ERROR***:', error)
                })
        }
    }
    const findDefaultAddress = (address) => {
        if (address.isDefaultAddress) return address
    }

    const handleSelection = (id) => {
        var selectedId = selectedId

        if (selectedId === id) {
            setSelectedId(id)
        } else setSelectedId(id)
    }

    const handelDefault = (item) => {
        actionDefaultAddress.updateDeliveryAddress(item)
        if (route.params?.nextPage === 'goBack') {
            navigation.goBack()
        } else {
            // then go to place order screen
            navigation.navigate('PlaceOrder')
        }
    }

    const handleEditPress = (item) => {
        navigation.navigate('DeliveryAddress', { editAddress: item })
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelection(item.id)}>
                <View>
                    <AddressCard
                        item={item}
                        onEditPress={() => handleEditPress(item)}
                        onDeliveryPress={() => handelDefault(item)}
                        selected={selectedId}
                        isSelected={item.isDefaultAddress}
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
            }}
        >
            {listOfAddresses.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={listOfAddresses}
                        refreshing={refreshing}
                        extraData={selectedId}
                        renderItem={renderItem}
                        o
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                            height: 120,
                            marginBottom: 10,
                            borderTopWidth: 0.25,
                            borderTopColor: 'gray',
                        }}
                    >
                        <Button
                            icon={{
                                name: 'add',
                                size: 15,
                                color: 'white',
                            }}
                            title="Add new address"
                            // type="outline"
                            buttonStyle={{
                                backgroundColor: 'tomato',
                                height: 50,
                                borderRadius: 8,
                            }}
                            titleStyle={{ color: 'white' }}
                            containerStyle={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginHorizontal: 20,
                                //height: 90,
                            }}
                            onPress={() =>
                                navigation.navigate('DeliveryAddress')
                            }
                        />
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>loading ...</Text>
                    <ActivityIndicator size="large" color="tomato" />
                </View>
            )}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
        deliverToAddress: state.deliveryAddress,
        listOfAddresses: state.addresses,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionDefaultAddress: bindActionCreators(
            defaultAddressActions,
            dispatch
        ),
        actionAddresses: bindActionCreators(addressesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliverToAddresses)

const styles = StyleSheet.create({})
