import * as errorMessages from '@constants/errorConstants';
import authJwtSchema from './authSchema';

const mainSchema = {
  type: 'object',
  properties: {
    baseURL: {
      type: 'string',
      format: 'uri',
      errorMessage: {
        type: errorMessages.ERROR_BASE_URL_TYPE,
        format: errorMessages.ERROR_BASE_URL_FORMAT
      }
    },
    ocapiVersion: {
      type: 'string',
      pattern: '^v\\d{2}_\\d$',
      errorMessage: {
        type: errorMessages.ERROR_OCAPI_VERSION_TYPE,
        pattern: errorMessages.ERROR_OCAPI_VERSION_PATTERN
      }
    },
    clientId: {
      type: 'string',
      errorMessage: {
        type: errorMessages.ERROR_CLIENT_ID_TYPE
      }
    },
    headers: {
      type: 'object',
      additionalProperties: { type: 'string' },
      default: {},
      errorMessage: {
        type: errorMessages.ERROR_HEADERS_TYPE
      }
    },
    authentication: authJwtSchema,
    timeout: {
      type: 'number',
      minimum: 5000,
      maximum: 15000,
      errorMessage: {
        minimum: errorMessages.ERROR_TIMEOUT_MIN,
        maximum: errorMessages.ERROR_TIMEOUT_MAX,
        type: errorMessages.ERROR_TIMEOUT_TYPE
      }
    }
  },
  required: ['baseURL', 'clientId'],
  additionalProperties: false,
  errorMessage: {
    required: {
      baseURL: errorMessages.ERROR_BASE_URL_MISSING,
      clientId: errorMessages.ERROR_CLIENT_ID_MISSING,
      authentication: errorMessages.ERROR_AUTH_MISSING
    },
    additionalProperties: errorMessages.ERROR_INVALID_CONFIG
  }
};

export default mainSchema;
