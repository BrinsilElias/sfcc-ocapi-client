import { codes, messages } from '../constants';

class OcapiError extends Error {
  constructor(code = codes.DEFAULTS, message = messages.DEFAULTS) {
    super(message);
    this.code = code;
    this.message = message;
    this.isCutomError = true;
  }
}

export default OcapiError;
