/* eslint-disable no-console */
import qs from 'qs';

/**
 * Makes an API call using the specified URL, method, and options.
 * @param {AxiosInstance} httpClient - The Axios instance to use for the API call.
 * @param {string} url - The URL to make the API call to.
 * @param {string} method - The HTTP method to use for the API call (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object} [options={}] - Additional options to customize the API call (e.g., headers, body, params).
 * @returns {Promise<any>} - A promise that resolves with the response data if the API call is successful.
 */
const apiCall = async (httpClient, url, method, options = {}) => {
  const response = await httpClient.request({
    method,
    url,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
    ...(options.params ? { params: options.params } : {}),
    ...(options.body ? { data: options.body } : {}),
    ...(options.auth ? { auth: options.auth } : {})
  });
  return response;
};

export default apiCall;
