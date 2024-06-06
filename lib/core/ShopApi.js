/* eslint-disable no-useless-constructor */
import OCAPI from './Ocapi';
import Products from './shop/Products';
import Promotions from './shop/Promotions';
import Customers from './shop/Customers';

const ShopApi = class extends OCAPI {
  constructor(config) {
    super(config);

    /**
     * Service for managing product-related operations.
     * @type {Products}
     */
    this.Products = new Products(this._httpClient, this.apiCall);

    /**
     * Service for managing customer-related operations.
     * @type {Customers}
     */
    this.Customers = new Customers(this._httpClient, this.apiCall);

    /**
     * Service for managing promotions-related operations.
     * @type {Promotions}
     */
    this.Promotions = new Promotions(this._httpClient, this.apiCall);
  }
};

export default ShopApi;
