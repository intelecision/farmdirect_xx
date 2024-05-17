import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Tab, TabView } from '@rneui/themed';

const SubCategoryTabScreen = ({ navigation, route }) => {
  const { subCategories } = route.params;
  const [category, setCategory] = useState({});
  const [filteredSubCategory, setFilteredSubCategory] = useState(subCategories);
  const [index, setIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={{ height: 30, backgroundColor: "white" }}
        >
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'white',
              height: 3,
            }}
            style={{ height: 20, backgroundColor: 'transparent' }}
            // variant="secondary"
          >
            {subCategories.map((item, index) => {
              return (
                <Tab.Item
                  key={index}
                  title={item.name}
                  titleStyle={{ fontSize: 12, color: 'black' }}
                />
              );
            })}
          </Tab>
        </ScrollView>
        <View style={{ flex: 35 }}>
          <TabView value={index} onChange={setIndex} animationType='spring'>
            {subCategories.map((item, index) => {
              return (
                <TabView.Item
                  key={index}
                  style={{ backgroundColor: '#fff', width: '100%' }}
                >
                  <Text>{item.name}</Text>
                </TabView.Item>
              );
            })}
          </TabView>
        </View>
      </>
    </View>
  );
};

export default SubCategoryTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
