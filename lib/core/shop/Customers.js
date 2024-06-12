import apiCall from '@utils/helpers/callApi';

class Customers {
  constructor(httpClient) {
    this._type = 'Customers';
    this._httpClient = httpClient;
  }

  /**
   * Sets the authorization header with the provided bearer token for the httpClient.
   *
   * @param {string} token - The bearer token to set as the authorization header.
   */
  setAuthorization = (token) => {
    this._httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  /**
   * Fetches the authentication token using the provided authentication configuration.
   *
   * @returns {Promise<string>} A promise that resolves with the authentication token.
   */
  fetchToken = async (authentication) => {
    let auth = {};
    const url = '/customers/auth';
    const method = 'POST';
    const body = { type: authentication.customer_type };

    if (authentication.customer_type === 'credentials') {
      auth = {
        username: authentication.customer_id,
        password: authentication.customer_password
      };
    }

    const options = { body, auth };
    const res = await apiCall(this._httpClient, url, method, options);

    const header = res.headers.authorization;
    const token = header.replace('Bearer ', '');
    return token;
  };

  getCustomerOrder = async (customerId, options) => {
    const url = `/customers/${customerId}/orders`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };
}

export default Customers;
