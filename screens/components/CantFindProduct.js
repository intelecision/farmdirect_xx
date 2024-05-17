import React from 'react';
import { View, Text } from 'react-native';
import { greenTomatoes } from './../../constants/colours';
import { Input, Button } from '@rneui/themed';
import { isEmpty } from 'lodash';
const CantFindProduct = ({ suggestion, suggestionChange, onSuggest }) => {
  // const [hasSuggestion, setHasSuggestion] = useState(false);
  const hasSuggestion = () => {
    return suggestion && !isEmpty(suggestion);
  };
  return (
    // let disable == hasSuggestion();
    <View
      style={{
        margin: 10,
        backgroundColor: '#ddd',
      }}
    >
      <Text
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          marginBottom: 20,
          fontSize: 18,
          fontWeight: '600',
          color: greenTomatoes,
        }}
      >
        Cant find what you are looking for?
      </Text>

      <Text
        style={{
          marginHorizontal: 10,
          marginBottom: 20,
          textAlign: 'justify',
        }}
      >
        We are alway increasing our product range and delivery locations, as we
        make sure customers get their farm produce from Farm Direct to support
        local farmers. If there is something you think we should stock, please
        we want to hear from you!
      </Text>
      <View style={{ margin: 0 }}>
        <Input
          placeholder='Suggest a product'
          value={suggestion}
          onChangeText={suggestionChange}
          inputContainerStyle={{ height: 50, marginHorizontal: 20 }}
        />
      </View>

      <Button
        title='Suggest'
        type='clear'
        //  disabled={}
        onPress={onSuggest}
        titleStyle={{ color: greenTomatoes }}
        style={{ margin: 20 }}
      />
    </View>
  );
};

export default CantFindProduct;
