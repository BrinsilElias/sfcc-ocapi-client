import { codes, messages } from '../constants';

const OcapiError =  class extends Error {
  constructor(code = codes.DEFAULTS, message = messages.DEFAULTS) {
    super(message);
    this.code = code;
    this.message = message;
    this.isCutomError = true;
  }
}

export default OcapiError;
