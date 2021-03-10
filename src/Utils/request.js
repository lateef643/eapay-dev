import Axios from "axios";
import PropTypes from "prop-types";
import axiosRetry from "axios-retry";

import localStorage from "./localStorage"
import { BASEURL } from "./variables"

const axios = Axios.create();
const baseUrl = BASEURL;
const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

axiosRetry(axios, {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
});

const request = async ({ url, method, params, data, headers, token }) => {
  const authorization = token || localStorage.getToken("eapay-m");

  let config = {
    method,
    params,
    data,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
      ...headers,
    },
  };

  // if (method === "GET" || method === "DELETE") {
  //     config = omit(config, ["data"]);
  //   }

  const result = await axios({
    url: baseUrl + '/api' + url,
    ...config,
  });

  return result;
};

request.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.oneOf(["POST", "GET", "DELETE", "PUT", "UPDATE"]),
  params: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  headers: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  token: PropTypes.string,
};

export default request;
