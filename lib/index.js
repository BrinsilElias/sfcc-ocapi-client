import Ocapi from './core/Ocapi';
import createSchemaValidator from './utils/factory/schemaValidator';

function createOcapiInstance(config) {
  try {
    const ocapiInstance = new Ocapi(config);
    const validator = createSchemaValidator();

    Object.defineProperties(ocapiInstance, {
      baseUrl: {
        get() {
          return ocapiInstance._baseURL;
        },
        set(value) {
          const validateBaseURL = validator('baseURL');
          if (validateBaseURL(value)) {
            ocapiInstance._baseURL = value;
          }
        }
      },
      clientId: {
        get() {
          return ocapiInstance._clientId;
        },
        set(value) {
          const validateClientId = validator('clientId');
          if (validateClientId(value)) {
            ocapiInstance._clientId = value;
          }
        }
      },
      authentication: {
        get() {
          return ocapiInstance._authentication;
        },
        set(value) {
          const validateAuthObj = validator('authentication');
          if (validateAuthObj(value)) {
            ocapiInstance._authentication = value;
          }
        }
      },
      ocapiVersion: {
        get() {
          return ocapiInstance._ocapiVersion;
        },
        set(value) {
          const validateOcapiVersion = validator('ocapiVersion');
          if (validateOcapiVersion(value)) {
            ocapiInstance._ocapiVersion = value;
          }
        }
      },
      timeout: {
        get() {
          return ocapiInstance._timeout;
        },
        set(value) {
          const validateTimeout = validator('timeout');
          if (!validateTimeout(value)) {
            ocapiInstance._timeout = value;
          }
        }
      }
    });

    return ocapiInstance;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating Ocapi instance:', error);
    throw error;
  }
}

export default createOcapiInstance;
