/* eslint-disable */
import { Get, Post, Put, Delete } from "./instance";
import router from "./router"

export default {
  Login: (param) => Post(router.LOGIN, param, null),
  GetTest: (url) => Get(url,{},{})
};
