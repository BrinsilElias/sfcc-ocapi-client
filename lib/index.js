import ShopApi from '@core/ShopApi';
import apiCall from '@utils/helpers/callApi';
import createSchemaValidator from '@utils/factory/schemaValidator';

/**
 * Creates an instance of Ocapi based on the provided configuration.
 *
 * @param {Object} config - The configuration object for the Ocapi instance.
 * @returns {Object} - The created Ocapi instance.
 */
function createOcapiInstance(config) {
  let ocapiInstance;
  try {
    const validator = createSchemaValidator();
    const validateConfig = validator();
    validateConfig(config);
    ocapiInstance = new ShopApi(config);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating Ocapi instance: \nCause:', error.message);
  }
  return ocapiInstance;
}

export { apiCall, createOcapiInstance };
