/* eslint-disable no-useless-constructor */
import OCAPI from './Ocapi';

const DataApi = class extends OCAPI {
  constructor(config) {
    super(config);
  }
}

export default DataApi;
