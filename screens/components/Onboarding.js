import React, { useState, useRef, memo } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import slides from '../../constants/slides';
import OnboardingItem from './OnboardingItem';
import NavigationButton from './NavigationButton';
import { saveToStore } from '../../utils/localStorage';

const Onboarding = memo(({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // save. user been embordered
      saveToStore('VIEWED_ON_BOARDING', true);
      navigation.navigate('Auth', { screen: 'NewUserInfo' });
    }
  };
  const scrollBack = () => {
    if (currentIndex > 0) {
      slideRef.current.scrollToIndex({ index: currentIndex - 1 });
    } else {
      //  navigation.navigate("Tabs");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 4 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>

      <NavigationButton
        scrollTo={scrollTo}
        scrollBack={scrollBack}
        scrollX={scrollX}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </View>
  );
});

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
