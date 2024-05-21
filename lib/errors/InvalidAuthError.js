import OcapiError from './OcapiError';
import { codes, messages } from '../constants';

const InvalidAuthConfigError = class extends OcapiError {
  constructor(message) {
    super(message || messages.INVALID_AUTH_CONFIG, codes.INVALID_AUTH_CONFIG);
  }
};

export default InvalidAuthConfigError;
