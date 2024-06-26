import * as errorMessages from '@constants/errorConstants';
import createSchemaValidator from '@utils/factory/schemaValidator';

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
      expect(() => validateMain(config)).toThrow(errorMessages.ERROR_BASE_URL_MISSING);
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
      expect(() => validateMain(config)).toThrow(errorMessages.ERROR_CLIENT_ID_MISSING);
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
      expect(() => validateMain(config)).toThrow(errorMessages.ERROR_INVALID_CONFIG);
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
      expect(() => validateBaseUrl({ baseURL: baseUrl })).toThrow(
        errorMessages.ERROR_BASE_URL_TYPE
      );
    });

    it('should throw an error if the base url is an invalid format', () => {
      baseUrl = 'zzra-001.dx.commercecloud.salesforce.com';
      expect(() => validateBaseUrl({ baseURL: baseUrl })).toThrow(
        errorMessages.ERROR_BASE_URL_FORMAT
      );
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
      expect(() => validateClientId({ clientId: clientId })).toThrow(
        errorMessages.ERROR_CLIENT_ID_TYPE
      );
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
      expect(() => validateTimeout({ timeout: timeout })).toThrow(errorMessages.ERROR_TIMEOUT_MIN);
    });

    it('should throw an error if the timeout is greater than the maximum', () => {
      timeout = 20000;
      expect(() => validateTimeout({ timeout: timeout })).toThrow(errorMessages.ERROR_TIMEOUT_MAX);
    });

    it('should throw an error if the timeout is an invalid type', () => {
      timeout = '10000';
      expect(() => validateTimeout({ timeout: timeout })).toThrow(errorMessages.ERROR_TIMEOUT_TYPE);
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
      expect(() => validateOcapiVersion({ ocapiVersion: version })).toThrow(
        errorMessages.ERROR_OCAPI_VERSION_TYPE
      );
    });

    it('should throw an error if the ocapi version is an invalid pattern', () => {
      version = 'v20';
      expect(() => validateOcapiVersion({ ocapiVersion: version })).toThrow(
        errorMessages.ERROR_OCAPI_VERSION_PATTERN
      );
    });
  });

  describe('authentication validator', () => {
    let authentication;
    const validateAuthentication = validator('authentication');
    it('should return true if the authentication is valid', () => {
      authentication = {
        customer_type: 'credentials',
        customer_id: 'dummy@email.com',
        customer_password: 'password'
      };
      expect(validateAuthentication({ authentication: authentication })).toBe(true);
    });

    it('should throw an error if the authentication is an invalid type', () => {
      authentication = 123;
      expect(() => validateAuthentication({ authentication: authentication })).toThrow(
        errorMessages.ERROR_AUTH_TYPE
      );
    });

    it('should throw an error if the authentication is missing the customer type', () => {
      authentication = {
        customer_id: 'dummy@email.com',
        customer_password: 'password'
      };
      expect(() => validateAuthentication({ authentication: authentication })).toThrow(
        errorMessages.ERROR_AUTH_CUSTOMER_TYPE_MISSING
      );
    });

    it('should throw an error if the authentication has an invalid customer type', () => {
      authentication = {
        customer_type: 'invalid',
        customer_id: 'dummy@email.com',
        customer_password: 'password'
      };
      expect(() => validateAuthentication({ authentication: authentication })).toThrow(
        errorMessages.ERROR_AUTH_CUSTOMER_TYPE_ENUM
      );
    });

    it('should throw an error if the authentication is missing the customer id', () => {
      authentication = {
        customer_type: 'credentials',
        customer_password: 'password'
      };
      expect(() => validateAuthentication({ authentication: authentication })).toThrow(
        errorMessages.ERROR_AUTH_CUSTOMER_ID_MISSING
      );
    });

    it('should throw an error if the authentication has an invalid customer id', () => {
      authentication = {
        customer_type: 'credentials',
        customer_id: 'dummy#email.com',
        customer_password: 'password'
      };
      expect(() => validateAuthentication({ authentication: authentication })).toThrow(
        errorMessages.ERROR_AUTH_CUSTOMER_ID_FORMAT
      );
    });

    it('should throw an error if the authentication is missing the customer password', () => {
      authentication = {
        customer_type: 'credentials',
        customer_id: 'dummy@email.com'
      };
      expect(() => validateAuthentication({ authentication: authentication })).toThrow(
        errorMessages.ERROR_AUTH_CUSTOMER_PASSWORD_MISSING
      );
    });
  });
});
