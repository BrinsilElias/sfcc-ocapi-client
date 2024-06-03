import * as messages from '../../lib/constants/errorConstants';
import createSchemaValidator from '../../lib/utils/factory/schemaValidator';

describe('schema validator', () => {
  const validator = createSchemaValidator();
  it('should return a function', () => {
    expect(typeof validator).toBe('function');
  });

  describe('configuration validator', () => {
    const validateMain = validator();
    it('should return true if the configuration is valid', () => {
      const config = {
        baseURL: 'https://zzra-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v20_3',
        clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        authentication: {
          customer_type: 'credentials',
          customer_id: 'dummy@email.com',
          customer_password: 'password'
        }
      };
      expect(validateMain(config)).toBe(true);
    });

    it('should throw an error if base url is missing from the configuration', () => {
      const config = {
        clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        authentication: {
          customer_type: 'credentials',
          customer_id: 'dummy#email.com',
          customer_password: 'password'
        }
      };
      expect(() => validateMain(config)).toThrow(messages.ERROR_BASE_URL_MISSING);
    });

    it('should throw an error if client id is missing from the configuration', () => {
      const config = {
        baseURL: 'https://zzra-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v20_3',
        authentication: {
          customer_type: 'credentials',
          customer_id: 'dummy#email.com',
          customer_password: 'password'
        }
      };
      expect(() => validateMain(config)).toThrow(messages.ERROR_CLIENT_ID_MISSING);
    });

    it('should throw an error if authentication is missing from the configuration', () => {
      const config = {
        baseURL: 'https://zzra-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v20_3',
        clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      expect(() => validateMain(config)).toThrow(messages.ERROR_AUTH_MISSING);
    });

    it('should throw an error if the configuration has invalid properties', () => {
      const config = {
        baseURL: 'https://zzra-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v20_3',
        clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        authentication: {
          customer_type: 'credentials',
          customer_id: 'dummy#email.com',
          customer_password: 'password'
        },
        invalidProperty: 'invalid'
      };
      expect(() => validateMain(config)).toThrow(messages.ERROR_INVALID_CONFIG);
    });
  });

  describe('base url validator', () => {
    let baseUrl;
    const validateBaseUrl = validator('baseURL');
    it('should return true if the base url is valid', () => {
      baseUrl = 'https://zzra-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v20_3';
      expect(validateBaseUrl({ baseURL: baseUrl })).toBe(true);
    });

    it('should throw an error if the base url is an invalid type', () => {
      baseUrl = 123;
      expect(() => validateBaseUrl({ baseURL: baseUrl })).toThrow(messages.ERROR_BASE_URL_TYPE);
    });

    it('should throw an error if the base url is an invalid format', () => {
      baseUrl = 'zzra-001.dx.commercecloud.salesforce.com';
      expect(() => validateBaseUrl({ baseURL: baseUrl })).toThrow(messages.ERROR_BASE_URL_FORMAT);
    });
  });

  describe('client id validator', () => {
    let clientId;
    const validateClientId = validator('clientId');
    it('should return true if the client id is valid', () => {
      clientId = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      expect(validateClientId({ clientId: clientId })).toBe(true);
    });

    it('should throw an error if the client id is an invalid type', () => {
      clientId = 123456789;
      expect(() => validateClientId({ clientId: clientId })).toThrow(messages.ERROR_CLIENT_ID_TYPE);
    });
  });

  describe('timeout validator', () => {
    let timeout;
    const validateTimeout = validator('timeout');
    it('should return true if the timeout is valid', () => {
      timeout = 6000;
      expect(validateTimeout({ timeout: timeout })).toBe(true);
    });

    it('should throw an error if the timeout is less than the minimum', () => {
      timeout = 1000;
      expect(() => validateTimeout({ timeout: timeout })).toThrow(messages.ERROR_TIMEOUT_MIN);
    });

    it('should throw an error if the timeout is greater than the maximum', () => {
      timeout = 20000;
      expect(() => validateTimeout({ timeout: timeout })).toThrow(messages.ERROR_TIMEOUT_MAX);
    });

    it('should throw an error if the timeout is an invalid type', () => {
      timeout = '10000';
      expect(() => validateTimeout({ timeout: timeout })).toThrow(messages.ERROR_TIMEOUT_TYPE);
    });
  });

  describe('ocapi version validator', () => {
    let version;
    const validateOcapiVersion = validator('ocapiVersion');
    it('should return true if the ocapi version is valid', () => {
      version = 'v20_3';
      expect(validateOcapiVersion({ ocapiVersion: version })).toBe(true);
    });

    it('should throw an error if the ocapi version is an invalid type', () => {
      version = 123;
      expect(() => validateOcapiVersion({ ocapiVersion: version })).toThrow(messages.ERROR_OCAPI_VERSION_TYPE);
    });

    it('should throw an error if the ocapi version is an invalid pattern', () => {
      version = 'v20';
      expect(() => validateOcapiVersion({ ocapiVersion: version })).toThrow(messages.ERROR_OCAPI_VERSION_PATTERN);
    });
  });
});
