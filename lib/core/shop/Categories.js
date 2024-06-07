import apiCall from '@utils/helpers/callApi';

class Categories {
  constructor(httpClient) {
    this._type = 'Categories';
    this._httpClient = httpClient;
  }

  /**
   * Retrieves the categories.
   *
   * @param {Array<string>} categoryIds - The unique identifiers for the categories.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The categories.
   */
  getCategoriesByIds = async (categoryIds, options) => {
    const url = `/categories/(${categoryIds.join(',')})`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves the category.
   *
   * @param {string} categoryId - The unique identifier for the category.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The category.
   */
  getCategoryById = async (categoryId, options) => {
    const url = `/categories/${categoryId}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };
}

export default Categories;
