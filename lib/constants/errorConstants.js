export const ERROR_BASE_URL_TYPE = 'Base url must be a valid string.';
export const ERROR_BASE_URL_FORMAT = 'Base url must be a valid URI.';
export const ERROR_BASE_URL_MISSING = 'Base url is missing. Enter a valid base url';

export const ERROR_OCAPI_VERSION_TYPE = 'Ocapi version must be a valid number.';
export const ERROR_OCAPI_VERSION_PATTERN = "Ocapi version must match the pattern 'vXX_X' (e.g., 'v24_1').";

export const ERROR_CLIENT_ID_TYPE = 'Client Id must be a valid string.';
export const ERROR_CLIENT_ID_MISSING = 'Client Id is missing. Enter a valid client id.';

export const ERROR_HEADERS_TYPE = 'Headers must be a valid object with string values.';

export const ERROR_TIMEOUT_MIN = 'Timeout must be at least 5000 milliseconds.';
export const ERROR_TIMEOUT_MAX = 'Timeout must be at most 15000 milliseconds.';
export const ERROR_TIMEOUT_TYPE = 'Timeout must be a number.';

export const ERROR_AUTH_MISSING = 'Authentication is missing.';
export const ERROR_AUTH_CUSTOMER_TYPE = 'Customer type must be a string.';
export const ERROR_AUTH_CUSTOMER_TYPE_ENUM = "Customer type must be one of 'guest', 'credentials', 'session', or 'refresh'.";
export const ERROR_AUTH_CUSTOMER_TYPE_MISSING = 'Customer type is missing. Enter a valid customer type';
export const ERROR_AUTH_CUSTOMER_ID_TYPE = 'Customer Id must be a valid string.';
export const ERROR_AUTH_CUSTOMER_ID_FORMAT = 'Customer Id must be a valid email address.';
export const ERROR_AUTH_CUSTOMER_ID_MISSING = "Customer Id is required when customer type is 'credentials'.";
export const ERROR_AUTH_CUSTOMER_PASSWORD_TYPE = 'Customer password must be a valid string.';
export const ERROR_AUTH_CUSTOMER_PASSWORD_MIN = 'Customer password must be greater than 8 characters.';
export const ERROR_AUTH_CUSTOMER_PASSWORD_MISSING = "Customer password is required when customer type is 'credentials'.";
export const ERROR_AUTH_INVALID = 'Invalid JWT authentication object. Check required fields and values.';

export const ERROR_INVALID_CONFIG = 'Invalid configuration object. Check required fields and values.';
