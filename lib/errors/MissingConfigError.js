import CustomError from './OcapiError';
import { codes, messages } from '../constants';

const MissingConfigError = class extends CustomError {
  constructor(message) {
    super(message || messages.MISSING_CONFIG, codes.MISSING_CONFIG,);
  }
};

export default MissingConfigError;
