import { Order } from './../../Models/Orderings';

export default {
  cartItems: [],
  products: [],
  categories: [],
  subCategories: [],
  timeSlot: { date: '', slot: '', deliveryCost: 0 },
  authorization: { userInfo: {}, isAuthorized: false },
  deliveryAddress: {},
  addresses: [],
  favourites: [],
  pendingDeliveries: [],
  promotions: [],
  salesOrder: new Order(),
  userWallet: [],
};
