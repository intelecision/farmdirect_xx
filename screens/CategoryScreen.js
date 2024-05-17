import {
    View,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { ListItem, SearchBar, Icon, Header } from '@rneui/themed'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadProducts } from '../redux/actions/productsActions'
import { addItemToCart } from './../redux/actions/shoppingCartActions'
import { loadCategories } from '../redux/actions/categoryActions'
import ProductSearch from './components/ProductSearch'
import { ASSERTS_IMAGES, IMAGE_SOURCE } from '../constants/AppConstants'
import Stepper from './../screens/components/Stepper'
import { loadSubCategories } from './../redux/actions/subCategoryActions'
import { Asset } from 'expo-asset'
import { getAllFarm } from '../Api/services/productServices'
import ProducerCard from './components/ProducerCard'

import { Text } from './../components/Themed'
import CategoryItem from './components/CategoryItem'
import ShopByCategory from './components/ShopByCategory'

class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Browse our produce',
            header: null,
        }
    }

    state = {
        search: '',
        isSearching: false,
        isFiltering: false,
        headerHeight: 80,
        listOProducers: [],
    }
    popularSearches = [
        { id: 1, name: 'Whats new' },
        { id: 2, name: 'Pork' },
        { id: 3, name: 'Chicken' },
        { id: 4, name: 'Goat meat' },
        { id: 5, name: 'Live Animals' },
        { id: 6, name: 'Live Chicken' },
    ]

    componentDidMount() {
        const {
            loadProducts,
            loadCategories,
            products,
            categories,
            subCategories,
        } = this.props

        this.startHeaderHeight = 100
        if (Platform.OS === 'android') {
            this.startHeaderHeight = 120 + StatusBar.currentHeight
        }

        getAllFarm()
            .then((data) => {
                this.setState({ listOProducers: data })
            })
            .then((producers) => {})
            .catch((error) => {
                console.log(error)
            })

        // load the prod categories
        if (categories.length === 0) {
            loadCategories().catch((error) => {
                alert('failed to load Categories' + error)
            })
        }

        // load the products
        if (products.length === 0) {
            loadProducts().catch((error) => {
                alert('failed to load products' + error)
            })
        }

        // this.loadProducers();
    }

    filterCategory = (categoryId) => {
        const { subCategories } = this.props
        let subs = ''
        const result = subCategories.filter((x) => x.categoryId === categoryId)
        result.forEach((s) => {
            subs += s.name + ' '
        })

        return (
            <Text style={{ fontWeight: '700', fontSize: 20 }}>
                ·{' '}
                <Text style={{ fontWeight: 'normal', fontSize: 12 }}>
                    {subs}
                </Text>
            </Text>
        )
    }

    loadProducers = () => {
        getAllFarm()
            .then((data) => {
                this.setState({ producers: data })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    updateSearch = (search) => {
        const isFiltering = search?.length > 2
        this.setState({ search, isSearching: true, isFiltering })
    }
    handleCancel = () => {
        this.setState({ search: '', headerHeight: 80, isSearching: false })
    }

    handleFocus = () => {
        this.setState({ headerHeight: 40, isSearching: true })
        this.search.focus()
    }
    handleClearText = () => {
        this.search.cancel()
    }

    onRemovePress = () => {
        //
    }
    handleNavigation = (category) => {
        const result = this.props.subCategories.filter(
            (x) => x.categoryId === category.id
        )
        console.log('XXX', category.name)
        this.props.navigation.navigate('EXPLORE', {
            screen: 'Sub_Category',
            params: {
                subCategories: result,
                selectedCategory: category,
                title: category.categoryName,
            },
        })
    }
    onNavigate = (item) => {
        this.props.navigation.navigate('ItemDetail', {
            product: item,
            title: item.productName,
        })
    }

    renderSearchItems = ({ item }) => {
        const { shoppingCart, navigation } = this.props
        const imageSource = IMAGE_SOURCE + item.imageUri

        const idx = shoppingCart.findIndex((p) => p.id === item.id)
        let quantity = 0

        if (idx !== -1) {
            let thisCart = Object.assign({}, shoppingCart[idx])
            quantity = thisCart.quantity
        }

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('ItemDetail', {
                        product: item,
                        title: item.productName,
                    })
                }
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '100%',
                        height: 195,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                flex: 1,
                                width: 150,
                                height: null,
                                paddingBottom: 10,
                                resizeMode: 'cover',
                            }}
                            source={{ uri: imageSource }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 2,
                            flexDirection: 'column',
                            paddingLeft: 10,
                        }}
                    >
                        <View style={{ flex: 3 }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 16,
                                    fontWeight: '700',
                                    marginLeft: 5,
                                    marginTop: 10,
                                }}
                            >
                                {item.productName}
                            </Text>
                            <Text style={{ color: '#204B24' }}>
                                {item.farmName}
                            </Text>
                            <Text style={{ marginTop: 10 }}>
                                {' '}
                                {item.productSize}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingBottom: 10,
                                paddingRight: 10,
                                alignContent: 'flex-end',
                            }}
                        >
                            <Stepper
                                onAdd={() => handleAddToCart(item.id)}
                                onRemove={() => handleRemoveFromCart(item.id)}
                                quantity={quantity}
                                price={item.price}
                                salePrice={item.salePrice}
                                isOnSale={item.isOnSale}
                                pricePerMeasure={0}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderItem = ({ item }) => {
        imageUri = `${ASSERTS_IMAGES}${item.imageSource}`

        return (
            <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => this.handleNavigation(item)}
            >
                <CategoryItem name={item.categoryName} image={imageUri} />
            </TouchableOpacity>
        )
    }

    handelCardPress = (item) => {
        this.props.navigation.navigate('EXPLORE', {
            screen: 'Producer',
            params: { farmId: item.id, producer: item },
        })
    }
    renderCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.handelCardPress(item)}>
                <ProducerCard
                    title={item.farmName}
                    narrative={this.truncate(item.narrative)}
                    image={item.imageUri.trim()}
                    containerStyle={{
                        //  width: 350,
                        margin: 10,
                    }}
                />
            </TouchableOpacity>
        )
    }
    renderItems = ({ item }) => {
        return (
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }

    renderHeader = () => {
        return (
            <View style={{ height: 40, margin: 10, paddingTop: 10 }}>
                <Text style={{ color: 'gray' }}>Popular searches</Text>
            </View>
        )
    }
    handleViewAll = () => {
        this.props.navigation.navigate('OurProducers')
    }
    truncate = (input) => {
        if (input.length > 5) {
            return input.substring(0, 100) + '...'
        }
        return input
    }
    render() {
        const { categories } = this.props
        const {
            search,
            isSearching,
            isFiltering,
            headerHeight,
            listOProducers,
        } = this.state

        return (
            <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
                <StatusBar barStyle="light-content" />
                <View style={{ borderWidth: null, borderColor: 'white' }}>
                    <Header
                        style={{ height: 120 }}
                        statusBarProps={{ barStyle: 'dark-content' }}
                        centerComponent={{
                            text: 'Explore our produce',
                            style: { fontSize: 18, fontWeight: '600' },
                        }}
                        containerStyle={{
                            backgroundColor: 'white',
                            borderBottomColor: 'white',
                            justifyContent: 'space-around',
                            // height: headerHeight,
                        }}
                    />
                    <SearchBar
                        ref={(search) => (this.search = search)}
                        lightTheme
                        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                        placeholder="Try pork, beef, chicken, Tomatoes..."
                        showCancel
                        onChangeText={(text) => this.updateSearch(text)}
                        onFocus={this.handleFocus}
                        onCancel={() => this.handleCancel()}
                        value={search.toLowerCase()}
                        cancelButtonTitle="Cancel"
                        containerStyle={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#ddd',
                            backgroundColor: 'transparent',
                        }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    {isSearching ? (
                        isFiltering ? (
                            <ProductSearch
                                query={search}
                                navigation={this.props.navigation}
                            />
                        ) : (
                            this.popularSearches.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={() =>
                                        this.setState({
                                            search: item.name,
                                            isFiltering: true,
                                        })
                                    }
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {item.name}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        )
                    ) : (
                        <View style={{ flex: 1 }}>
                            <ShopByCategory
                                categories={categories}
                                subCategories={this.props.subCategories}
                            />

                            {/*<FlatList
                                data={categories}
                                keyExtractor={(item, index) =>
                                    item.id.toString()
                                }
                                renderItem={this.renderItem}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                ListFooterComponent={
                                    <View
                                        style={{
                                            paddingHorizontal: 1,
                                            paddingVertical: 20,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 3,
                                                flexDirection: 'row',
                                                height: 50,
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        fontWeight: '700',
                                                        fontSize: 18,
                                                        margin: 10,
                                                    }}
                                                >
                                                    Our Farmers and producers
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                style={{
                                                    height: 40,
                                                    marginRight: 10,
                                                }}
                                                onPress={() =>
                                                    this.handleViewAll()
                                                }
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'flex-end',
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                    }}
                                                >
                                                    <Text>View All</Text>
                                                    <Icon
                                                        name="right"
                                                        type="antdesign"
                                                        color="red"
                                                        iconStyle={{
                                                            alignSelf:
                                                                'flex-end',
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <FlatList
                                            data={listOProducers}
                                            keyExtractor={(item, index) =>
                                                item.id.toString()
                                            }
                                            renderItem={this.renderCard}
                                            horizontal
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                        />
                                    </View>
                                }
                            />*/}
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    StepperGroupStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        paddingLeft: 5,
    },
    NumberRosStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        height: 30,
        margin: 5,
    },
    UpDownButtonStyle: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2e4e1',
        borderWidth: 0.5,
        borderColor: '#eb4a2a',
        height: 30,
        width: 30,
        margin: 5,
    },
    AddStyle: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
        borderWidth: 0.5,
        borderColor: '#dddddd',
        height: 30,
        width: 80,
        margin: 5,
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    TextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
    },
    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
    buttonStyle: {
        width: '100%',
        height: 170,
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 10,
    },
})

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        categories: state.categories,
        subCategories: state.subCategories,
    }
}

const mapDispatchToProps = {
    loadProducts,
    loadCategories,
    addItemToCart,
    loadSubCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
