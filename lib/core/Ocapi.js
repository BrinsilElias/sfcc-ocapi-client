/* eslint-disable no-console */
import axios from 'axios';
import defaultConfig from '@constants/defaultConfig';
import createSchemaValidator from '@utils/factory/schemaValidator';

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
  }

  /**
   * Get method for retrieving the base URL used for API requests.
   *
   * @returns {string} The base URL for API requests.
   */
  get baseURL() {
    return this._baseURL;
  }

  /**
   * Set method for updating the base URL used for API requests.
   *
   * @param {string} value - The new base URL to be set.
   * @returns {void}
   */
  set baseURL(value) {
    try {
      const validateBaseURL = validator('baseURL');
      if (validateBaseURL({ baseURL: value })) {
        this._baseURL = value;
      }
    } catch (error) {
      console.log('Error setting baseURL\nCause:', error.message);
    }
  }

  /**
   * Get method for retrieving the client ID used for API requests.
   *
   * @returns {string} The client ID for authentication.
   */
  get clientId() {
    return this._clientId;
  }

  /**
   * Set method for updating the client ID used for API requests.
   *
   * @param {string} value - The new client ID to be set.
   * @returns {void}
   */
  set clientId(value) {
    try {
      const validateClientId = validator('clientId');
      if (validateClientId({ clientId: value })) {
        this._clientId = value;
      }
    } catch (error) {
      console.log('Error setting clientId\nCause:', error.message);
    }
  }

  /**
   * Get method for retrieving the authentication object used for API requests.
   *
   * @returns {object} The authentication object containing customer type, id, and password.
   */
  get authentication() {
    return this._authentication;
  }

  /**
   * Set method for updating the authentication object used for API requests.
   *
   * @param {object} value - The new authentication object to be set, containing customer type, id, and password.
   * @returns {void}
   */
  set authentication(value) {
    try {
      const validateAuthObj = validator('authentication');
      if (validateAuthObj({ authentication: value })) {
        this._authentication = value;
      }
    } catch (error) {
      console.log('Error setting authentication\nCause:', error.message);
    }
  }

  /**
   * Get method for retrieving the OCAPI version used for API requests.
   *
   * @returns {string} The OCAPI version for API requests.
   */
  get ocapiVersion() {
    return this._ocapiVersion;
  }

  /**
   * Set method for updating the OCAPI version used for API requests.
   *
   * @param {string} value - The new OCAPI version to be set.
   * @returns {void}
   */
  set ocapiVersion(value) {
    try {
      const validateOcapiVersion = validator('ocapiVersion');
      if (validateOcapiVersion({ ocapiVersion: value })) {
        this._ocapiVersion = value;
      }
    } catch (error) {
      console.log('Error setting ocapiVersion\nCause:', error.message);
    }
  }

  /**
   * Get method for retrieving the timeout value used for API requests.
   *
   * @returns {number} The timeout value in milliseconds.
   */
  get timeout() {
    return this._timeout;
  }

  /**
   * Set method for updating the timeout value used for API requests.
   *
   * @param {number} value - The new timeout value to be set in milliseconds.
   * @returns {void}
   */
  set timeout(value) {
    try {
      const validateTimeout = validator('timeout');
      if (!validateTimeout({ timeout: value })) {
        this._timeout = value;
      }
    } catch (error) {
      console.log('Error setting timeout\nCause:', error.message);
    }
  }

  /**
   * Creates an HTTP client using axios with the provided configuration.
   *
   * @param {object} config - Optional configuration object for the HTTP client.
   * @param {string} config.baseURL - The base URL for the HTTP client. If not provided, uses the default base URL.
   * @param {number} config.timeout - The timeout value in milliseconds for the HTTP client. If not provided, uses the default timeout.
   * @param {object} config.headers - Additional headers to be included in the HTTP client request.
   * @returns {object} An instance of axios HTTP client configured with the specified options.
   */
  createApiClient = (config = {}) => {
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
  };

  /**
   * Makes an API call using the specified URL, method, and options.
   * @param {string} url - The URL to make the API call to.
   * @param {string} method - The HTTP method to use for the API call (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param {Object} [options={}] - Additional options to customize the API call (e.g., headers, body, query parameters).
   * @returns {Promise<any>} - A promise that resolves with the response data if the API call is successful.
   * @throws {Error} - If the API call fails or returns a non-200 status code.
   */
  apiCall = async (url, method, options = {}) => {
    let response;
    try {
      const res = await this._httpClient({
        method,
        url,
        ...options
      });
      response = res;
    } catch (error) {
      // Log or rethrow the error depending on your error handling strategy
      response = false;
      console.error('Error making API call:', error);
    }
    return response;
  };
  // ... more methods as needed
};

export default OCAPI;
