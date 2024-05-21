import OcapiError from './OcapiError';
import { codes, messages } from '../constants';

const InvalidBaseUrlError = class extends OcapiError {
  constructor(message) {
    super(message || messages.INVALID_BASE_URL, codes.INVALID_BASE_URL);
  }
};

export default InvalidBaseUrlError;
