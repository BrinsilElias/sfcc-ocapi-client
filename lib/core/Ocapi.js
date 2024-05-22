import has from 'has';
import axios from 'axios';
import { hasProperties } from '../helpers/utilities';
import { MissingConfigError, InvalidAuthConfigError, InvalidBaseUrlError } from '../errors';

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

class OCAPI {
  constructor(config) {
    const mergedConfig = { ...defaultConfig, ...config };

    if (!mergedConfig.baseURL) {
      throw new MissingConfigError('Base url is missing from the confiuration');
    }
    if (!baseURLPattern.test(mergedConfig.baseURL)) {
      throw new InvalidBaseUrlError();
    }
    this.baseURL = this.parseBaseURL(mergedConfig.baseURL);
    if (!mergedConfig.clientId) {
      throw new MissingConfigError('Client Id is missing from the confiuration');
    }
    this.clientId = mergedConfig.clientId;
    if (!mergedConfig.authentication) {
      throw new MissingConfigError('Authentication is missing from the confiuration');
    }

    this.authentication = mergedConfig.authentication;
    this.headers = mergedConfig.headers
      ? { ...mergedConfig.defaultHeaders, ...mergedConfig.headers }
      : { ...mergedConfig.defaultHeaders };
    this.ocapiVersion = mergedConfig.ocapiVersion;
    this.timeout = mergedConfig.timeout;
    this.config = mergedConfig;
    this.httpClient = this.createApiClient();
    this.accessToken = this.fetchToken();
  }

  createApiClient(config = {}) {
    // Logic for create http client using axios
    const axiosConfig = {
      baseURL: config.baseURL || this.baseURL.absURL,
      timeout: config.timeout || this.timeout,
      headers: {
        ...this.headers,
        ...config.headers,
        'x-dw-client-id': this.clientId
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
    const authConfig = this.authentication;
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
          config.baseURL = this.baseURL.absURL
            .replace(/\/s\/[A-Za-z]+/, '')
            .replace(/(dw\/)(shop|data)/g, (match, $1, $2) => `${$1}oauth2`)
            .replace(/v\d+_\d+/, '');
          config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          config.params = { client_id: this.clientId };
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
            username: this.clientId,
            password: authConfig.client_password
          };
          config.baseURL = this.baseURL.absURL
            .replace(
              /(https?:\/\/)([^.]+\.[^.]+\.[^.]+\.[^.]+)(\.com)/,
              (match, $1, $2, $3) => `${$1}account.demandware${$3}`
            )
            .replace(/\/s\/[A-Za-z]+/, '')
            .replace(/(dw\/)(shop|data)/g, (match, $1, $2) => `${$1}oauth2`)
            .replace('/dw', '/dwsso')
            .replace(/v\d+_\d+/, '');
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

  parseBaseURL(baseURL) {
    const url = baseURL || this.baseURL.absURL;
    if (typeof url !== 'string' && !baseURLPattern.test(url)) {
      return null;
    }

    const match = url.match(baseURLPattern);
    return {
      absURL: baseURL,
      publicDomain: match[2],
      site: match[3],
      apiType: match[5],
      ocapiVersion: match[6]
    };
  }
  // ... more methods as needed
}

export default OCAPI;
