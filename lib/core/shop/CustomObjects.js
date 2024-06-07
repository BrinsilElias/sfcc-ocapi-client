import apiCall from '@utils/helpers/callApi';

class CustomObjects {
  constructor(httpClient) {
    this._type = 'Custom Objects';
    this._httpClient = httpClient;
  }

  /**
   * Fetches the custom objects.
   *
   * @param {string} objType - The type of the custom object.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The custom objects.
   */
  getCustomObjects = async (objType, objKey) => {
    const url = `/custom_objects/${objType}/${objKey}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method);
    return res.data;
  };
}

export default CustomObjects;
