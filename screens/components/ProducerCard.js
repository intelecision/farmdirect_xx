import React from 'react';
import { View, Text as DefaultText, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from './../../components/Themed';

const ProducerCard = ({
  title,
  narrative,
  image,
  onCardPress,
  containerStyle,
}) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <TouchableOpacity onPress={onCardPress}>
        <View style={{ height: 160, marginBottom: 10 }}>
          <Image
            resizeMethod='resize'
            source={{
              uri: 'http://otuofarms.com/farmdirect/images/' + image,
            }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <View style={{ height: 90, margin: 10, borderTopWidth: 0.25 }}>
        <DefaultText style={styles.title}>{title}</DefaultText>
        <Text ellipsizeMode='tail' numberOfLines={3} style={styles.narrative}>
          {narrative}
        </Text>
      </View>
    </View>
  );
};
export default ProducerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 0,
  },
  image: {
    // flex: 1,
    height: 160,
    width: null,
    margin: 10,
    resizeMode: 'contain',
    // resizeMode: "cover",
  },
  narrative: {
    textAlign: 'justify',
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '700',
  },
});
