import { retrieveItem, saveToStore } from "./localStorage";
import { isEmpty, isArray } from "lodash";

// add to the list
export const addOrRemoveFavourites = (item) => {
  // get all favourites items
  retrieveItem("FAVOURITES_KEY").then((data) => {
    if (data) {
      if (isArray(data)) {
        // check if its already
        const val = data.find((element) => element.id === item.id);
        if (val) {
          // already exit so remove it and override with new values
          const newValue = data.splice(data.indexOf(val), 1);
          saveToStore("FAVOURITES_KEY", newValue);
        } else {
          // add to list
          data.push(item);
          saveToStore("FAVOURITES_KEY", data);
        }
      }
    } else {
      let listOfFavourites = [{}];
      listOfFavourites.push(item);
      saveToStore("FAVOURITES_KEY", listOfFavourites);
      console.log("listOfFavourites", listOfFavourites);
    }
  });
};

export const RemoveFavourites = (item) => {
  if (isArray(data)) {
    // check if its already
    const val = data.find((element) => element.id === item.id);
    if (val) {
      // already exit so remove it and override with new values
      const newValue = data.splice(data.indexOf(val), 1);
      saveToStore("FAVOURITES_KEY", newValue);
    }
  }
};
