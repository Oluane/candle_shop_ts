import axios from "axios";

import { convertCamelToSnake, convertSnakeToCamel } from "../utils/stringUtils";

const apiInstance = axios.create({
  baseURL: "/api",
  timeout: 50000,
  proxy: {
    host: "127.0.0.1",
    port: 5001,
  },
});

apiInstance.interceptors.request.use((req) => {
  let newReq = { ...req };
  const token = localStorage.getItem("xsrfToken");
  if (token) {
    newReq.headers["x-xsrf-token"] = token;
  }

  //intercepting request data to convert its keys to snake case to fits with DB naming convention

  if (typeof newReq.data === "object") {
    let data = {};
    Object.keys(newReq.data).map((e) => {
      return (data[convertCamelToSnake(e)] = newReq.data[e]);
    });
    newReq.data = data;
  }
  return newReq;
});

apiInstance.interceptors.response.use((res) => {
  //intercepting response data to convert its keys to camel case to fits with JS front naming convention

  let newRes = { ...res };

  if (newRes.data.length !== undefined && newRes.data.length > 0) {
    newRes.data = newRes.data.map((item) => {
      if (typeof item === "object") {
        let data = {};
        Object.keys(item).map((e) => {
          return (data[convertSnakeToCamel(e)] = item[e]);
        });
        return data;
      }
      return item;
    });
  }

  return newRes;
});

export default apiInstance;
