export default Order = {
  customerId: 0,
  mobile: null,
  deliveryInformation: null,
  deliveryDate: null,
  deliverySlot: null,
  currency: null,
  amount: 0,
  deliveryAddress: null,
  orderDate: null,
  orderStatus: null,
  voucherCode: null,
  voucherValue: 0,
  discountAmount: 0,
  deliveryCost: null,
  paymentStatus: null,
  paymentReference: null,
  paymentMethod: null,
  paymentDate: null,
  VAT: 0,
  orderItems: undefined,
};

OrderItem = {
  discount: 0,
  productId: null,
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
  discount: 0,
  orderId: null,
};