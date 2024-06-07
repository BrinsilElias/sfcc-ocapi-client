import apiCall from '@utils/helpers/callApi';

class Contents {
  constructor(httpClient) {
    this._type = 'Content';
    this._httpClient = httpClient;
  }

  /**
   * Retrieves the content of a pages.
   *
   * @param {string} pageId - The unique identifier for the page.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The page content.
   */
  getPageContentsByIds = async (pageIds, options) => {
    const url = `/contents/${pageIds.join(',')}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves the content of a page.
   *
   * @param {string} pageId - The unique identifier for the page.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The page content.
   */
  getPageContentById = async (pageId, options) => {
    const url = `/contents/${pageId}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };
}

export default Contents;
