import Ocapi from './core/Ocapi';
import createSchemaValidator from './utils/factory/schemaValidator';

function createOcapiInstance(config) {
  let ocapiInstance;
  try {
    const validator = createSchemaValidator();
    const validateConfig = validator();
    validateConfig(config);
    ocapiInstance = new Ocapi(config);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating Ocapi instance: \nCause:', error.message);
  }
  return ocapiInstance;
}

export default createOcapiInstance;
