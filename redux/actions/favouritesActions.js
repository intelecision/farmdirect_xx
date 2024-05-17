import * as types from "./actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

function loadFavouritesSuccess(favourites) {
  return { type: types.LOAD_FAVOURITES_SUCCESS, favourites };
}
function addToFavouritesSuccess(favourite) {
  return { type: types.ADD_FAVOURITES_SUCCESS, favourite };
}
function removeFromFavouritesSuccess(favourite) {
  return { type: types.REMOVE_FAVOURITES_SUCCESS, favourite };
}
function updateFavouritesSuccess(favourites) {
  return { type: types.SAVE_FAVOURITES_SUCCESS, favourites };
}

export function loadFavourites() {
  return function (dispatch) {
    return retrieveItem("FAVOURITES_KEY")
      .then((data) => {
        dispatch(loadFavouritesSuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateFavourites(favourites) {
  return function (dispatch) {
    return saveFavourites("FAVOURITES_KEY", favourites)
      .then(() => {
        dispatch(updateFavouritesSuccess(favourites));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function addToFavourites(favourite) {
  return function (dispatch) {
    return retrieveItem("FAVOURITES_KEY")
      .then((favourites) => {
        if (favourites) {
          // check if already exist
          const found = favourites.findIndex(
            (element) => element.id == favourite.id
          );
          if (found === -1) favourites.push(favourite);
        } else {
          favourites = [];
          favourites.push(favourite);
        }
        saveFavourites("FAVOURITES_KEY", favourites);

        dispatch(addToFavouritesSuccess(favourite));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function removeFromFavourites(favourite) {
  return function (dispatch) {
    return retrieveItem("FAVOURITES_KEY")
      .then((favourites) => {
        if (favourites) {
          var index = favourites.findIndex((x) => x.id == favourite.id);
          favourites.splice(index, 1);
          saveFavourites("FAVOURITES_KEY", favourites);
          dispatch(removeFromFavouritesSuccess(favourite));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}
export const saveFavourites = async (key, value) => {
  try {
    if (value) {
      const jsonValue = JSON.stringify(value);
      const stored = await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // saving error
  }
};
const retrieveItem = async (key) => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);

    if (item) return item;
    else return null;
  } catch (error) {
    console.log(error);
  }
};
