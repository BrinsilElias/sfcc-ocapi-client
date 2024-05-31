import axios from 'axios';

const defaultConfig = {
  defaultHeaders: {
    'Accept-Charset': 'utf-8',
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  },
  ocapiVersion: 'v24_1',
  timeout: 5000
};

const OCAPI = class {
  constructor(config) {
    const mergedConfig = { ...defaultConfig, ...config };

    this._baseURL = mergedConfig.baseURL;
    this._clientId = mergedConfig.clientId;
    this._authentication = mergedConfig.authentication;
    this._headers = mergedConfig.headers
      ? { ...mergedConfig.defaultHeaders, ...mergedConfig.headers }
      : { ...mergedConfig.defaultHeaders };
    this._ocapiVersion = mergedConfig.ocapiVersion;
    this._timeout = mergedConfig.timeout;
    this._config = mergedConfig;
    this._httpClient = this.createApiClient();
    this._accessToken = this.fetchToken();
  }

  createApiClient(config = {}) {
    // Logic for create http client using axios
    const axiosConfig = {
      baseURL: config.baseURL || this._baseURL,
      timeout: config.timeout || this._timeout,
      headers: {
        ...this._headers,
        ...config.headers,
        'x-dw-client-id': this._clientId
      }
    };
    // Optional Parameters: Add Other Configs
    return axios.create(axiosConfig);
  }

  async fetchToken() {
    const config = {};
    const authConfig = this._authentication;

    if (authConfig.customer_type === 'credentials') {
      config.auth = {
        username: authConfig.customer_id,
        password: authConfig.customer_password
      };
    }
    config.url = '/customers/auth';
    config.body = { type: authConfig.customer_type };

    const client = this.createApiClient(config); // Create client for auth request
    const res = await client.post(config.url, config.body, {
      auth: config.auth
    });

    const header = res.headers.authorization;
    const token = header.replace('Bearer ', '');
    return token;
  }
  // ... more methods as needed
}

export default OCAPI;
