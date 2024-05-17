import { retrieveItem } from "../utils/localStorage";
import { saveToStore } from "./localStorage";

export const getAllAddresses = async () => {
  return await retrieveItem("ADDRESSES_KEY");
};

export const getDefaultAddresses = async () => {
  const deliveryAddress = await retrieveItem("ADDRESSES_KEY");

  if (deliveryAddress)
    return deliveryAddress.find((a) => a.isDefaultAddress === true);
  else return null;
};

export const saveAddresses = async (address) => {
  let deliveryAddress = await retrieveItem("ADDRESSES_KEY");
  if (deliveryAddress) {
    const isArray = Array.isArray(deliveryAddress);
    // set all defaults address to false
    for (var i = 0; i < deliveryAddress.length; i++) {
      deliveryAddress[i].isDefaultAddress == false;
    }

    if (isArray) {
      deliveryAddress.push(address);
    }
  } else {
    deliveryAddress = [];
    deliveryAddress.push(address);
  }

  saveToStore("ADDRESSES_KEY", deliveryAddress);
};
