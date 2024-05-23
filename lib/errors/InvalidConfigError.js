import OcapiError from './OcapiError';
import { codes, messages } from '../constants';

const InvalidConfigError = class extends OcapiError {
  constructor(message) {
    super(message || messages.INVALID_CONFIG, codes.INVALID_CONFIG);
  }
};

export default InvalidConfigError;
