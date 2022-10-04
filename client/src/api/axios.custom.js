import axios from "axios";
import config from "../config";
import {
  getAdminFromLocalStorage,
  getUserFromLocalStorage,
} from "../helpers/localstorage";

const instance = axios.create({
  baseURL: config.API_URL,
});

instance.interceptors.request.use(function (config) {
  const user = getUserFromLocalStorage() || getAdminFromLocalStorage();
  config.headers.Authorization = user ? `Bearer ${user.token}` : "";
  return config;
});

export default instance;
