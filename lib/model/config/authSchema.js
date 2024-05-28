import * as errorMessages from '../../constants/errorConstants';

const authJwtSchema = {
  type: 'object',
  properties: {
    customer_type: {
      type: 'string',
      enum: ['guest', 'credentials', 'session', 'refresh'],
      errorMessage: {
        type: errorMessages.ERROR_AUTH_CUSTOMER_TYPE,
        enum: errorMessages.ERROR_AUTH_CUSTOMER_TYPE_ENUM
      }
    },
    customer_id: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: errorMessages.ERROR_AUTH_CUSTOMER_ID_TYPE,
        format: errorMessages.ERROR_AUTH_CUSTOMER_ID_FORMAT
      }
    },
    customer_password: {
      type: 'string',
      format: 'password',
      minLength: 8,
      errorMessage: {
        type: errorMessages.ERROR_AUTH_CUSTOMER_PASSWORD_TYPE,
        minLength: errorMessages.ERROR_AUTH_CUSTOMER_PASSWORD_MIN
      }
    }
  },
  required: ['customer_type'],
  if: { properties: { customer_type: { const: 'credentials' } } },
  then: {
    required: ['customer_id', 'customer_password'],
    errorMessage: {
      required: {
        customer_id: errorMessages.ERROR_AUTH_CUSTOMER_ID_MISSING,
        customer_password: errorMessages.ERROR_AUTH_CUSTOMER_PASSWORD_MISSING
      }
    }
  },
  additionalProperties: false,
  errorMessage: {
    required: {
      customer_type: errorMessages.ERROR_AUTH_CUSTOMER_TYPE_MISSING
    },
    additionalProperties: errorMessages.ERROR_AUTH_INVALID
  }
};

export default authJwtSchema;
