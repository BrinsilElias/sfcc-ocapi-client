import apiCall from '@utils/helpers/callApi';

class Promotions {
  constructor(httpClient) {
    this._type = 'Promotions';
    this._httpClient = httpClient;
  }

  /**
   * Retrieves a list of all promotions.
   *
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The promotions data.
   */
  getPromotions = async (options) => {
    const url = '/promotions';
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves details of a specific promotion by its ID.
   *
   * @param {string} promotionId - The unique identifier for the promotion.
   * @param {Object} [es={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The promotion details.
   */
  getPromotionById = async (promotionId, options) => {
    const url = `/promotions/${promotionId}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves details of multiple promotions by their IDs.
   *
   * @param {string[]} promotionIds - Array of promotion identifiers.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The details of the specified promotions.
   */
  getPromotionsByIds = async (promotionIds, options) => {
    const url = `/promotions/(${promotionIds.join(',')})`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };
}

export default Promotions;
