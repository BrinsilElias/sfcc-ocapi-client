const codes = {
  DEFFAULT: 'UNKNOWN_ERROR',
  MISSING_CONFIG: 'MISSING_CONFIGURATION',
  INVALID_CONFIG: 'INVALID_CONFIGURATION',
  INVALID_AUTH_CONFIG: 'INVALID_AUTH_CONFIGURATION'
};

const messages = {
  DEFFAULT: 'An unknown error occurred',
  MISSING_CONFIG: 'Required configurations are missing',
  INVALID_CONFIG: 'Invalid configuration. Enter a valid configuration',
  INVALID_AUTH_CONFIG: 'Invalid auth configuration'
};

export { codes, messages };
