import delay from "../delay";
import axios from "axios";
import routes from "../../constants/AppConstants";

export const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get( routes.BASE_URL +'category/GetCategories')
        .then(({ data }) => {
          resolve(Object.assign([], data));
        })
        .catch((error) => reject(error));
    }, delay);
  });
};

export const getAllSubCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(
        routes.BASE_URL +'/category/GetSubCategories'
        )
        .then(({ data }) => {
          resolve(Object.assign([], data));
        })
        .catch((error) => reject(error));
    }, delay);
  });
};

class CategoryService {
  static getAllCategories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get(routes.BASE_URL +'/category/GetCategories')
          .then(({ data }) => {
            resolve(Object.assign([], data));
          })
          .catch((error) => reject(error));
      }, delay);
    });
  }

  static getAllSubCategories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get(
            routes.BASE_URL +'/category/GetSubCategories'
          )
          .then(({ data }) => {
            resolve(Object.assign([], data));
          })
          .catch((error) => reject(error));
      }, delay);
    });
  }
}
