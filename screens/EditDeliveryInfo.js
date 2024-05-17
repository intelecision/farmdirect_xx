import { CommonActions } from '@react-navigation/routers';
import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView } from 'react-native';
import { Header, Button } from '@rneui/themed';
import HeaderLeftArrow from '../components/HeaderLeftArrow';

const EditDeliveryInfo = ({ route, navigation }) => {
  const [text, setText] = useState('');
  const [deliveryInstruction, setDeliveryInstruction] = useState('');
  const [inputLength, setInputLength] = useState(170);

  const textChange = (text) => {
    const maxLength = 170;
    setInputLength(maxLength - text.length);
    setText(text);
  };

  const goBack = () => {
    route.params.onGoBack(text);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#EFEBE8' }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          <View style={{ margin: 10 }}>
            <TextInput
              style={{
                height: 170,
                borderColor: 'gray',
                borderWidth: 1,
                margin: 10,
                textAlign: 'left',
                padding: 4,
                textAlignVertical: 'top',
              }}
              multiline={true}
              maxLength={170}
              placeholder='Call me 30 minutes before delivery on 0242 1233 4543'
              onChangeText={(text) => textChange(text)}
              value={text}
            />
            <Text style={{ textAlign: 'right', margin: 10 }}>
              {inputLength} characters remaining
            </Text>
            <View style={{ marginBottom: 20 }}>
              <Text>
                Add useful information to help the delivery driver get your
                order to the right place,,.
              </Text>
            </View>
            <Button
              title='Save'
              disabled={text.length < 15}
              loading={false}
              buttonStyle={{ backgroundColor: 'tomato' }}
              onPress={goBack}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default EditDeliveryInfo;
