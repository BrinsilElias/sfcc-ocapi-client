import has from 'has';
import axios from 'axios';
import { hasProperties } from '../helpers/utilities';
import { MissingConfigError, InvalidAuthConfigError, InvalidConfigError } from '../errors';

const baseURLPattern =
  /^(https?:\/\/([^\s/]+))(\/s\/\w+)?\/(dw\/(shop|data))\/(v\d+(?:_\d+)?)(\/\w+)?\/?$/;

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

    if (!mergedConfig.baseURL) {
      throw new MissingConfigError('Base url is missing from the confiuration');
    }
    if (!baseURLPattern.test(mergedConfig.baseURL)) {
      throw new InvalidConfigError(
        'Invalid base url. Url should match: http(s)://{public_domain}[/s/site_id]/dw/{api_type}/{ocapi_version}'
      );
    }
    if (!mergedConfig.clientId) {
      throw new MissingConfigError('Client Id is missing from the confiuration');
    }
    if (!mergedConfig.authentication) {
      throw new MissingConfigError('Authentication is missing from the confiuration');
    }
    if (typeof mergedConfig.clientId !== 'string') {
      throw new InvalidConfigError('Client Id must be a string');
    }
    if (typeof mergedConfig.timeout !== 'number') {
      throw new InvalidConfigError('Timeout must be a number');
    }
    if (typeof mergedConfig.ocapiVersion !== 'string') {
      throw new InvalidConfigError('OCAPI Version must be a string');
    }
    if (!/v\d+_\d+/.test(mergedConfig.ocapiVersion)) {
      throw new InvalidConfigError('Invalid OCAPI Version.');
    }

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
    if (typeof value !== 'string') {
      throw new InvalidConfigError('Base url must be a string');
    }
    if (!baseURLPattern.test(value)) {
      throw new InvalidConfigError(
        'Invalid base url. Url should match: http(s)://{public_domain}[/s/site_id]/dw/{api_type}/{ocapi_version}'
      );
    }
    this._baseUrl = value;
  }

  get clientId() {
    return this._clientId;
  }

  set clientId(value) {
    if (typeof value !== 'string') {
      throw new InvalidConfigError('Client Id must be a string');
    }
    this._clientId = value;
  }

  get authentication() {
    return this._authentication;
  }

  set authentication(value) {
    if (!has(value, 'type') && typeof value.type !== 'string') {
      throw new InvalidAuthConfigError('Missing required properties for authentication');
    }

    const authType = value.type.toLowerCase();
    switch (authType) {
      case 'jwt':
        if (!hasProperties(value, ['customer_id', 'customer_password', 'customer_type'])) {
          throw new InvalidAuthConfigError('Missing required properties for JWT authentication');
        }
        break;
      case 'o_auth_2':
        if (!has(value, 'credential_type')) {
          throw new InvalidAuthConfigError('Missing required properties for OAuth2 authentication');
        }
        if (value.credential_type.toLowerCase() === 'bm_user_grant') {
          if (!hasProperties(value, ['grant_type', 'bm_user_id', 'bm_user_key', 'client_password'])) {
            throw new InvalidAuthConfigError('Missing required properties for OAuth2 BM User Grant authentication');
          }
        } else if (value.credential_type.toLowerCase() === 'client_cred_grant') {
          if (!hasProperties(value, ['grant_type', 'client_password'])) {
            throw new InvalidAuthConfigError('Missing required properties for OAuth2 Client Credentials Grant authentication');
          }
        } else {
          throw new InvalidAuthConfigError('Unsupported credential_type for OAuth2 authentication');
        }
        break;
      default:
        throw new InvalidAuthConfigError('Unsupported authentication type');
    }
    this._authentication = value;
  }

  get ocapiVersion() {
    return this._ocapiVersion;
  }

  set ocapiVersion(value) {
    if (typeof value !== 'string' || !/v\d+_\d+/.test(value)) {
      throw new InvalidConfigError('OCAPI Version must be a string and in the format v{number}_{number}');
    }
    this._ocapiVersion = value;
  }

  get timeout() {
    return this._timeout;
  }

  set timeout(value) {
    if (typeof value !== 'number') {
      throw new InvalidConfigError('Timeout must be a number');
    }
    this._timeout = value;
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

    if (config.params) {
      axiosConfig.params = { ...config.params };
    }

    // Optional Parameters: Add Other Configs
    return axios.create(axiosConfig);
  }

  async fetchToken() {
    let properties;
    const config = {};
    const authConfig = this._authentication;
    const authType = authConfig.type.toLowerCase();

    switch (authType) {
      case 'jwt':
        properties = ['customer_id', 'customer_password', 'customer_type'];
        if (!hasProperties(authConfig, properties)) {
          throw new InvalidAuthConfigError('Missing required properties for JWT');
        }
        config.auth = {
          username: authConfig.customer_id,
          password: authConfig.customer_password
        };
        config.url = '/customers/auth';
        config.body = { type: authConfig.customer_type };
        break;
      case 'o_auth_2':
        if (has(authConfig, 'credential_type') && authConfig.credential_type === 'bm_user_grant') {
          properties = ['grant_type', 'bm_user_id', 'bm_user_key', 'client_password'];
          if (!hasProperties(authConfig, properties)) {
            throw new InvalidAuthConfigError(
              'Missing required properties for OAuth2 BM User Grant'
            );
          }
          config.auth = {
            username: `${authConfig.bm_user_id}:${authConfig.bm_user_key}`,
            password: authConfig.client_password
          };
          config.baseURL = this._baseURL
            .replace(/\/s\/[A-Za-z]+/, '')
            .replace(/(dw\/)(shop|data)/g, (match, $1) => `${$1}oauth2`)
            .replace(/v\d+_\d+/, '');
          config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          config.params = { client_id: this._clientId };
        } else if (
          has(authConfig, 'credential_type') &&
          authConfig.credential_type === 'client_cred_grant'
        ) {
          properties = ['grant_type', 'client_password'];
          if (!hasProperties(authConfig, properties)) {
            throw new InvalidAuthConfigError(
              'Missing required properties for OAuth2 Client Credentials Grant'
            );
          }
          config.auth = {
            username: this._clientId,
            password: authConfig.client_password
          };
          config.baseURL = 'https://account.demandware.com/dw/oauth2';
        } else {
          throw new InvalidAuthConfigError('Unsupported credential_type for OAuth2');
        }
        config.url = '/access_token';
        config.body = { grant_type: authConfig.grant_type };
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        break;
      default:
        throw new InvalidAuthConfigError('Unsupported authentication type');
    }

    const client = this.createApiClient(config); // Create client for auth request
    const res = await client.post(config.url, config.body, {
      auth: config.auth
    });

    return res;
  }
  // ... more methods as needed
}

export default OCAPI;
