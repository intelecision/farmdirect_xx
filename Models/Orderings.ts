export class Order {
  public id: number;
  public fullName: string;
  public phoneNumber: string;
  public customerId: number;
  public mobile: string;
  public deliveryInformation: string;
  public deliveryDate: Date;
  public deliverySlot: string;
  public currency: string;
  public amount: number;
  public deliveryAddress: string;
  public orderNumber: string;
  public orderDate: Date;
  public orderStatus: string;
  public voucherCode: string;
  public voucherValue: number;
  public discountAmount: number;
  public deliveryCost: number;
  public paymentStatus: string;
  public paymentReference: string;
  public paymentMethod: string;
  public paymentDate: Date;
  public VAT: number;
  public orderItems: OrderItems[];
}

export class OrderItems {
  public id: number;
  public discount: number = 0;
  public productId: number;
  public quantity: number;
  public unitPrice: number;
  public totalPrice: number;
  public orderId: number;
  constructor() {}
}

export enum paymentOptions {
  mobileMoney,
  creditCard,
  paypal,
}
