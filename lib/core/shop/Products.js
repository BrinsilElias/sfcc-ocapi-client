import apiCall from '@utils/helpers/callApi';

class Products {
  constructor(httpClient) {
    this._type = 'Products';
    this._httpClient = httpClient;
  }

  /**
   * Retrieves details of a product by its ID.
   *
   * @param {string} productId - The unique identifier for the product.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The product details.
   */
  getProductById = async (productId, options) => {
    const url = `/products/${productId}`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves details of multiple products by their IDs.
   *
   * @param {string[]} productIds - Array of product identifiers.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The details of the specified products.
   */
  getProductsByIds = async (productIds, options) => {
    if (!Array.isArray(productIds)) {
      throw new Error('productIds must be an array');
    }
    const cleanedIds = productIds.map((id) => id.trim());
    const url = `/products/(${cleanedIds.join(',')})`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves availability information of a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The availability data of the product.
   */
  getProductAvailability = async (productId, options) => {
    const url = `/products/${productId}/availability`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves details of bundled products for a given product ID.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The bundled products data.
   */
  getBundledProducts = async (productId, options) => {
    const url = `/products/${productId}/bundled_products`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves images associated with a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The product images.
   */
  getProductImages = async (productId, options) => {
    const url = `/products/${productId}/images`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res;
  };

  /**
   * Retrieves links associated with a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The product links.
   */
  getProductLinks = async (productId, options) => {
    const url = `/products/${productId}/links`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves options available for a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The product options.
   */
  getProductOptions = async (productId, options) => {
    const url = `/products/${productId}/options`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves pricing information for a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object>} - The product prices.
   */
  getProductPrices = async (productId, options) => {
    const url = `/products/${productId}/prices`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves promotions associated with a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The product promotions.
   */
  getProductPromotions = async (productId, options) => {
    const url = `/products/${productId}/promotions`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves recommendations related to a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The product recommendations.
   */
  getProductRecommendations = async (productId, options) => {
    const url = `/products/${productId}/recommendations`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves set products associated with a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The set products.
   */
  getSetProducts = async (productId, options) => {
    const url = `/products/${productId}/set_products`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves shipping methods available for a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The shipping methods.
   */
  getProductShippingMethods = async (productId, options) => {
    const url = `/products/${productId}/shipping_methods`;
    const method = 'GET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };

  /**
   * Retrieves variations of a specific product.
   *
   * @param {string} productId - The product's unique identifier.
   * @param {Object} [options={}] - Additional options for the API call.
   * @returns {Promise<Object[]>} - The product variations.
   */
  getProductVariations = async (productId, options) => {
    const url = `/products/${productId}/variations`;
    const method = 'ÍGET';
    const res = await apiCall(this._httpClient, url, method, options);
    return res.data;
  };
}

export default Products;
