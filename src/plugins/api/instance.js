import axios from "axios";
import { Has, ToQuerystr } from "@/plugins/utils";
import i18n from "@/plugins/i18n";
import { Message } from "view-design";

import netErrorCord from "@/plugins/api/ErrorCode/net";
import config from "./config";

const errorRes = { data: null, status: { code: null } };
const axiosIns = axios.create(config);
// 回傳攔截
axiosIns.interceptors.response.use(
  response => {
    if (
      !Has(response, "data") ||
      !Has(response.data, "status") ||
      !Has(response.data.status, "code")
    ) {
      return errorRes;
    }
    const { code } = response.data.status;

    if (`${code}` === "0") return response.data;
    if (`${code}` === "21201") {
      window.location.href = "/"; // token 異常，登出
    }
    Message.error(i18n.tc(`err.${code}`));
    return errorRes;
  },
  error => {
    if (String(error.response.status) !== "200") {
      Message.error(i18n.tc(netErrorCord(error.response.status)));
    }
    return errorRes;
  }
);

/**
 * Get method
 * @param { string } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Get = (uri, Params, headers) =>
  new Promise(resolve => {
    axiosIns
      .get(uri + ToQuerystr(Params), { headers })
      .then(response => resolve(response));
  });

/**
 * Post method
 * @param { string } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Post = (uri, Params, headers) =>
  new Promise(resolve => {
    axiosIns
      .post(uri, JSON.stringify(Params), { headers })
      .then(response => resolve(response));
  });

/**
 * Put method
 * @param { string } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Put = (uri, Params, headers) =>
  new Promise(resolve => {
    axiosIns
      .put(uri, JSON.stringify(Params), { headers })
      .then(response => resolve(response));
  });

/**
 * Delete method
 * @param { string } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Delete = (uri, headers) =>
  new Promise(resolve => {
    axiosIns.delete(uri, { headers }).then(response => resolve(response));
  });

export { Get, Post, Put, Delete };
