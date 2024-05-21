import has from 'has';
import axios from 'axios';
import hasProperties from '../helpers/utilities';
import { MissingConfigError, InvalidAuthConfigError, InvalidBaseUrlError } from '../errors';

const baseURLPattern = /^(https?:\/\/([^\s/]+))(\/s\/\w+)?\/(dw\/(shop|data))\/(v\d+(?:_\d+)?)(\/\w+)?\/?$/;

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

  createApiClient() {
    // Logic for create http client using axios
    const axiosConfig = {
      baseURL: this.baseURL.absURL,
      timeout: this.timeout,
      headers: {
        ...this.headers,
        'x-dw-client-id': this.clientId
      }
    };

    // Optional Parameters: Add Other Configs
    return axios.create(axiosConfig);
  }

  async fetchToken() {
    const config = {};
    const authConfig = this.authentication;
    const authType = authConfig.type.toLowerCase();

    switch (authType) {
      case 'jwt':
        if (!hasProperties(authConfig, ['customer_type', 'customer_id', 'customer_password'])) {
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
          if (!hasProperties(authConfig, ['grant_type', 'bm_user_id', 'bm_user_key', 'client_password'])) {
            throw new InvalidAuthConfigError('Missing required properties for OAuth2 BM User Grant');
          }
          config.auth = {
            username: `${authConfig.bm_user_id}:${authConfig.bm_user_key}`,
            password: authConfig.client_password
          };
        } else if (
          has(authConfig, 'credential_type') && authConfig.credential_type === 'client_cred_grant'
        ) {
          if (!hasProperties(authConfig, ['grant_type', 'client_id', 'client_password'])) {
            throw new InvalidAuthConfigError('Missing required properties for OAuth2 Client Credentials Grant');
          }
          config.auth = {
            username: authConfig.client_id,
            password: authConfig.client_password
          };
        } else {
          throw new Error('Unsupported credential_type for OAuth2');
        }
        config.url = '/oauth2/access_token';
        config.body = { grant_type: authConfig.grant_type };
        break;
      default:
        throw new Error('Unsupported authentication type');
    }

    const client = this.createApiClient(); // Create client for auth request
    const res = await client.post(config.url, config.body, {
      auth: config.auth
    });

    return res.headers.authorization;
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
      site: match[4],
      apiType: match[5],
      ocapiVersion: match[6]
    };
  }
  // ... more methods as needed
}

export default OCAPI;
