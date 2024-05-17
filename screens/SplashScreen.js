import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { getServiceEndpoint } from '../Api/services/servicesApi';
import { saveTimeSlots } from '../utils/model/timeSlotRepository';
import { retrieveItem, saveToStore, removeItem } from '../utils/localStorage';

import * as productsActions from '../redux/actions/productsActions';
import * as shoppingCartActions from './../redux/actions/shoppingCartActions';
import * as categoryActions from '../redux/actions/categoryActions';
import * as timeSlotActions from '../redux/actions/timeSlotActions';
import * as authorizationActions from '../redux/actions/authorizationAction';
import * as subCategoryActions from '../redux/actions/subCategoryActions';
import * as deliveryAddressesActions from '../redux/actions/addressesAction';
import * as defaultAddressActions from '../redux/actions/deliveryAddressAction';
import * as promotionsAction from '../redux/actions/promotionsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigation } from '@react-navigation/core';
import { farmDirectApi } from '../Api/services/FarmDirectApi';
import { cos } from 'react-native-reanimated';
import Onboarding from './components/Onboarding';

const SplashScreen = ({ ...props }) => {
  const {
    products,
    actions,
    promotions,
    actionPromotions,
    actionsCategory,
    categories,
    subCategories,
    actionsSubCategory,
  } = props;
  const navigation = useNavigation();
  const { loading, setLoading } = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState();

  useEffect(() => {
    if (products?.length === 0) {
      actions.loadProducts().catch((error) => {
        console.log('1 failed to load products', error);
      });

      if (promotions?.length === 0) {
        actionPromotions.loadPromotions();
      }
    }

    if (categories?.length === 0) {
      actionsCategory.loadCategories().catch((error) => {
        alert('failed to load categories' + error);
      });
    }

    // load the prod categories
    if (subCategories?.length === 0) {
      actionsSubCategory.loadSubCategories().catch((error) => {
        alert('failed to load sub categories' + error);
      });
    }

    //removeItem("BASKET");
    GetTimeSlots();
    retrieveItem('FAVOURITES_KEY').then((data) => {
      if (!data) {
        saveToStore('FAVOURITES_KEY', false);
      }
    });

    goToMain();

    return () => {};
  }, []);

  GetTimeSlots = () => {
    //
    axios
      .get(getServiceEndpoint('timeslot'))

      .then((response) => {
        saveTimeSlots(response.data);
      })
      .catch((error) => {});
  };
  goToMain = () => {
    setTimeout(() => {
      retrieveItem('VIEWED_ON_BOARDING').then((data) => {
        setViewedOnboarding(data);

        if (data) {
          navigation.replace('Tabs');
        } else {
          navigation.replace('Onboarding');
        }
      });
    }, 2000);
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/splash.png')}
    >
      <StatusBar style='auto' />
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      ></View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='tomato' />
      </View>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart,
    products: state.products,
    categories: state.categories,
    timeSlot: state.timeSlot,
    authorization: state.authorization,
    subCategories: state.subCategories,
    deliveryAddresses: state.deliveryAddresses,
    promotions: state.promotions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productsActions, dispatch),
    trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
    actionsCategory: bindActionCreators(categoryActions, dispatch),
    actionsSubCategory: bindActionCreators(subCategoryActions, dispatch),
    actionTimeSlot: bindActionCreators(timeSlotActions, dispatch),
    authActions: bindActionCreators(authorizationActions, dispatch),
    actionDefaultAddress: bindActionCreators(defaultAddressActions, dispatch),
    actionPromotions: bindActionCreators(promotionsAction, dispatch),
    actionDeliveryAddresses: bindActionCreators(
      deliveryAddressesActions,
      dispatch
    ),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
