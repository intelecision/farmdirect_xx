import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from '../../components/Themed';
import Button from '../components/controls/Button';
import { useSelector } from 'react-redux';
import { removeItem } from './../../utils/localStorage';
import { farmDirectApi } from '../../Api/services/FarmDirectApi';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/authorizationAction';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { emptyBasket } from '../../redux/actions/shoppingCartActions';

type Props = {};

const DeleteAccount = (props: Props) => {
  const [reason, onChangeText] = React.useState<string | undefined>();
  const authorization = useSelector((state) => state.authorization);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [deleted, setDeleted] = React.useState(false);

  useEffect(() => {
    if (deleted) {
    }
  }, [deleted]);
  const handleDelete = async () => {
    try {
      let response = await farmDirectApi.deleteUserAccount(
        authorization.userInfo.id
      );
      if (response) {
        setDeleted(true);
        Alert.alert(
          'Delete Account',
          'Your account was deleted, successfully.',
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(emptyBasket());
                dispatch(logOut());
                navigation.navigate('Home');
              },
            },
          ]
        );
      }
    } catch (error) {
      setDeleted(false);
      r;
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        //  justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 30,
      }}
    >
      <Text style={{ textAlign: 'justify', fontSize: 18 }}>
        Deleting your account means you are leaving Farm Direct and you will no
        longer be shopping from us. If you are sure please provide us a reason
        for your decision.
      </Text>
      <TextInput
        onChangeText={onChangeText}
        multiline
        value={reason}
        placeholder='your reason for leaving us'
        style={{
          height: 80,
          marginTop: 20,
          borderWidth: 0.75,
          borderColor: 'gray',
          marginBottom: 30,
        }}
      />
      <Button
        title='DELETE'
        onPress={() => handleDelete()}
        disabled={false}
        isBusy={false}
      />
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
