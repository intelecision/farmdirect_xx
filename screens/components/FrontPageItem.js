import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

const FrontPageItem = ({ headerText, products, onAdd, onRemove }) => {
    console.log('HEREE')
    const renderHeader = () => {
        return (
            <View
                style={{
                    flex: 3,
                    flexDirection: 'row',
                    height: 50,
                    marginTop: 10,
                }}
            >
                <View style={{ flex: 3 }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 22,
                            margin: 10,
                        }}
                    >
                        {headerText}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ height: 40, marginRight: 10 }}
                    onPress={null}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text>View All</Text>
                        <Icon
                            name="chevron-right"
                            type="ionicons"
                            color="red"
                            iconStyle={{
                                alignSelf: 'flex-end',
                                fontSize: 20,
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const renderProduct = ({ item }) => {
        return (
            <View style={{ margin: 6 }} key={item.id}>
                <TouchableOpacity onPress={() => handleEssential(item)}>
                    <ProductCard
                        product={item}
                        badgeMessage={item.badgeMessage}
                        OnAddPress={() => handleAddToCart(item.id)}
                        onRemovePress={() => handleRemoveFromCart(item.id)}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ margin: 1 }}>
            {renderHeader(frontPage.title)}
            <FlatList
                key={frontPage.id}
                keyExtractor={(item) => item.id.toString()}
                data={products}
                renderItem={renderProduct}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}
export default FrontPageItem
const styles = StyleSheet.create({})
