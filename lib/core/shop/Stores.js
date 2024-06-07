import apiCall from '@utils/helpers/callApi';

class Stores {
  constructor(httpClient) {
    this._type = 'Stores';
    this._httpClient = httpClient;
  }

  /**
   * Retrieves details of a store for a gievn site.
   *
   * @param {string} storeId - The unique identifier for the store.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The store details.
   */
  getStores = async (options) => {
    const url = '/stores';
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves list of stores by its ID.
   *
   * @param {string} storeId - The unique identifier for the store.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The store details.
   */
  getStoresByIds = async (storeIds, options) => {
    const url = `/stores/(${storeIds.join(',')})`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves details of a store by its ID.
   *
   * @param {string} storeId - The unique identifier for the store.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The store details.
   */
  getStoreById = async (storeId, options) => {
    const url = `/stores/${storeId}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };
}

export default Stores;
