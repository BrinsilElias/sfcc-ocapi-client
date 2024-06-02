import createSchemaValidator from '../../lib/utils/factory/schemaValidator';

describe('Schema Validator', () => {
  it('should return a function', () => {
    const validator = createSchemaValidator();
    expect(typeof validator).toBe('function');
  });
});
