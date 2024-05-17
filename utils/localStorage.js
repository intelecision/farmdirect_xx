import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStore = async (key, value) => {
  // AsyncStorage.setItem(key, JSON.stringify(value));
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const retrieveItem = async (key) => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    return JSON.parse(retrievedItem);
  } catch (error) {
    throw error;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};
