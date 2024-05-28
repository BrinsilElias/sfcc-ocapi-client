import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import mainSchema from '../../model/config/mainSchema';

function createSchemaValidator(customOptions = {}) {
  const ajvOptions = { allErrors: true, ...customOptions };
  const ajv = new Ajv(ajvOptions);
  addFormats(ajv);
  ajvErrors(ajv, { keepErrors: false });

  const validateMain = ajv.compile(mainSchema);
  const subschemaCache = new Map();

  const compileSubschema = (schema, property) => {
    if (subschemaCache.has(property)) {
      return subschemaCache.get(property);
    }

    const subschema = schema.properties[property] ?? {};
    const compiledSubschema = ajv.compile({
      type: 'object',
      properties: { [property]: subschema }
    });
    subschemaCache.set(property, compiledSubschema);
    return compiledSubschema;
  };

  const handleValidationErrors = (errors) => {
    const errorMessages = errors.map((error) => {
      if (error.instancePath) {
        return `${error.instancePath}: ${error.message}`;
      }
      return `${error.message}`;
    });
    throw new Error(errorMessages.join('\n'));
  };

  return (property = null) => {
    const validator = property === null ? validateMain : compileSubschema(mainSchema, property);
    return (data) => {
      const valid = validator(data);
      if (!valid) {
        handleValidationErrors(validator.errors);
      }
      return true;
    };
  };
}

export default createSchemaValidator;
