const codes = {
  DEFFAULT: 'UNKNOWN_ERROR',
  MISSING_CONFIG: 'MISSING_CONFIGURATION',
  INVALID_BASE_URL: 'INVALID_BASE_URL',
  INVALID_AUTH_CONFIG: 'INVALID_AUTH_CONFIGURATION'
};

const messages = {
  DEFFAULT: 'An unknown error occurred',
  MISSING_CONFIG: 'Required configurations are missing',
  INVALID_BASE_URL: 'Invalid base url. Url should match: http(s)://{public_domain}[/s/site_id]/dw/{api_type}/{ocapi_version}',
  INVALID_AUTH_CONFIG: 'Invalid auth configuration'
};

export { codes, messages };
