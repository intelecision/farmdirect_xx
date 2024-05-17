import { retrieveItem } from "./localStorage";

export function CreateCartItem(product, quantity) {
  return {
    quantity,
    product,
    totalPrice: function() {
      return product.isOnSale
        ? product.salePrice * this.quantity
        : product.price * this.quantity;
    }
  };
}

export class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
  totalPrice() {
    return this.getTotalPrice();
  }
  getTotalPrice() {
    return this.product.isOnSale
      ? this.product.salePrice * this.quantity
      : this.product.price * this.quantity;
  }
}
