import apiCall from '@utils/helpers/callApi';

class Customers {
  constructor(httpClient) {
    this._type = 'Customers';
    this._httpClient = httpClient;
  }

  /**
   * Fetches the authentication token using the provided authentication configuration.
   *
   * @returns {Promise<string>} A promise that resolves with the authentication token.
   */
  fetchToken = async (authentication) => {
    let auth = {};
    const url = '/customers/auth';
    const method = 'POST';
    const data = { type: authentication.customer_type };

    if (authentication.customer_type === 'credentials') {
      auth = {
        username: authentication.customer_id,
        password: authentication.customer_password
      };
    }

    const options = { data, auth };
    const res = await apiCall(this._httpClient, url, method, options);

    const header = res.headers.authorization;
    const token = header.replace('Bearer ', '');
    return token;
  };
}

export default Customers;
