import { combineReducers } from 'redux';
import shoppingCart from './shoppingCartReducers';
import products from './productsReducers';
import categories from './categoriesReducers';
import subCategories from './subCategoriesReducers';
import timeSlot from './timeSlotReducers';
import authorization from './authorizationReducer';
import deliveryAddress from './deliveryAddressReducer';
import addresses from './addressesReducer';
import favourites from './favouritesReducer';
import salesOrder from './salesOrderReducer';
import promotions from './promotionsReducer';
import pendingDeliveries from './pendingDeliveriesReducer';
import myWallet from './userWalletReducer';

const rootReducer = combineReducers({
  shoppingCart,
  products,
  promotions,
  categories,
  subCategories,
  timeSlot,
  authorization,
  deliveryAddress,
  addresses,
  favourites,
  salesOrder,
  pendingDeliveries,
  myWallet,
});

export default rootReducer;
