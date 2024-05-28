import axios from 'axios';
import createSchemaValidator from '../utils/factory/schemaValidator';

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

const validator = createSchemaValidator();

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

  get baseUrl() {
    return this._baseUrl;
  }

  set baseUrl(value) {
    const validateBaseURL = validator('baseURL');
    if (validateBaseURL(value)) {
      this._baseUrl = value;
    }
  }

  get clientId() {
    return this._clientId;
  }

  set clientId(value) {
    const validateClientId = validator('clientId');
    if (validateClientId(value)) {
      this._clientId = value;
    }
  }

  get authentication() {
    return this._authentication;
  }

  set authentication(value) {
    const validateAuthObj = validator('authentication');
    if (validateAuthObj(value)) {
      this._authentication = value;
    }
  }

  get ocapiVersion() {
    return this._ocapiVersion;
  }

  set ocapiVersion(value) {
    const validateOcapiVersion = validator('ocapiVersion');
    if (validateOcapiVersion(value)) {
      this._ocapiVersion = value;
    }
  }

  get timeout() {
    return this._timeout;
  }

  set timeout(value) {
    const validateTimeout = validator('timeout');
    if (!validateTimeout(value)) {
      this._timeout = value;
    }
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

    return res;
  }
  // ... more methods as needed
}

export default OCAPI;
