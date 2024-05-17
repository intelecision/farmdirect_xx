import axios from "axios";
const getServiceEndpoint = () => {
  return LIVE_BASE_URL;
};
//const TEST_BASE_URL = "https://sandbox.expresspaygh.com/api";
const LIVE_BASE_URL = "https://expresspaygh.com/api";
const API_KEY =
  "WndnNFPin2MvNChSk9BU8-R8gim6GRUbJ9eglSeu4E-y0CK3b3oBkpZg2FR4M7r-AKuitjnlHuUx4YEuMmN";
const MERCHANT_ID = "058643222569";
const createApi = (baseURL) => {
  const api = axios.create({
    baseURL,
    timeout: 30000,
    withCredentials: false,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  function getMerchantId() {
    return "058643222569";
  }
  function getAuthKey() {
    return API_KEY;
  }
  const setToken = (token) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const setBaseURL = (baseURL) => {
    api.defaults.baseURL = baseURL;
  };

  const makeExpressPayment = (order) => {
    return api.post("/submit.php", new URLSearchParams(order));
  };
  const getApprovalUrl = (param) => {
    return `${getServiceEndpoint()}/checkout.php?token=${param}`;
  };

  return {
    api,
    setBaseURL,
    setToken,
    getMerchantId,
    getAuthKey,
    makeExpressPayment,
    getApprovalUrl,
  };
};

export const expressPayApi = createApi(getServiceEndpoint());
