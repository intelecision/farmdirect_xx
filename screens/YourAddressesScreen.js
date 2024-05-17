import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'
import { Header, Button, CheckBox } from '@rneui/themed'
import HeaderLeftArrow from './../components/HeaderLeftArrow'
import axios from 'axios'
import { saveToStore } from './../utils/localStorage'
import AddressCard from './components/AddressCard'
import { getServiceEndpoint } from './../Api/services/servicesApi'

class YourAddressesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return { header: null, mode: 'modal', headerMode: 'none' }
    }

    state = {
        isSaving: false,
        refreshing: false,
        selectedItem: null,
        selectedId: null,
        userInfo: undefined,
        addresses: [],
    }
    async componentDidMount() {
        await this._bootstrapAsync()
        this.loadAddress()
    }

    _bootstrapAsync = async () => {
        const { authorization } = this.props

        if (authorization) {
            //check token expiry
            this.setState({ userInfo: authorization.userInfo })
        }
    }
    handleEditPress = (item) => {
        const { navigation } = this.props
        navigation.navigate('DeliveryAddress', { editAddress: item })
    }

    findDefaultAddress = (address) => {
        if (address.isDefaultAddress) return address
    }

    loadAddress = () => {
        const { userInfo } = this.state

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
                        let aa = response.data.find(this.findDefaultAddress)

                        this.setState({
                            addresses: response.data,
                            refreshing: false,
                            selectedId: aa.id,
                        })

                        saveToStore('ADDRESSES_KEY', response.data)
                    }
                })
                .catch((error) => {
                    console.log('ERROR:', error)
                })
        }
    }

    handelDefault = (item) => {
        const addresses = this.state.addresses
        addresses.map((a) => (a.isDefaultAddress = false))
        this.setState({ addresses, refreshing: false })
        if (item.isDefaultAddress) {
            item.isDefaultAddress = false
        } else {
            item.isDefaultAddress = true
        }
        this.setState({ refreshing: true })

        this.props.navigation.goBack()
    }

    handleSelectedItem = (item) => {
        //
        const addresses = this.state.addresses
        addresses.map((a) => (a.isDefaultAddress = false))

        item.isDefaultAddress = true

        this.setState({
            addresses,
            refreshing: false,
        })
    }

    handleSelection = (id) => {
        var selectedId = this.state.selectedId

        if (selectedId === id) {
            this.setState({ selectedId: id })
        } else this.setState({ selectedId: id })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.handleSelection(item.id)}>
                <View>
                    <AddressCard
                        item={item}
                        onEditPress={() => this.handleEditPress(item)}
                        onDeliveryPress={() => this.handelDefault(item)}
                        selected={this.state.selectedId}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { addresses, refreshing, selectedId } = this.state
        console.log('JACK AM HERE')
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: selectedId === null ? 'white' : '#f5f5f5',
                    //selected ? styles.selected : styles.content
                }}
            >
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={addresses}
                    refreshing={refreshing}
                    extraData={this.state.selectedId}
                    renderItem={this.renderItem}
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
                        onPress={() =>
                            this.props.navigation.navigate('DeliveryAddress')
                        }
                    />
                </View>
            </View>
        )
    }
}

//const mapStateToProps = (state) => ({
//  authorization: state.authorization,
//});

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(YourAddressesScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: { flex: 1, backgroundColor: '#a0a0a0' },
})
