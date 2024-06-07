/* eslint-disable no-useless-constructor */
import OCAPI from './Ocapi';
import Site from './shop/Site';
import Stores from './shop/Stores';
import Contents from './shop/Contents';
import Products from './shop/Products';
import Customers from './shop/Customers';
import Promotions from './shop/Promotions';
import Categories from './shop/Categories';
import CustomObjects from './shop/CustomObjects';

const ShopApi = class extends OCAPI {
  constructor(config) {
    super(config);

    /**
     * Service for managing product-related operations.
     *
     * @type {Products}
     */
    this.Products = new Products(this._httpClient);

    /**
     * Service for managing customer-related operations.
     *
     * @type {Customers}
     */
    this.Customers = new Customers(this._httpClient);

    /**
     * Service for managing promotions-related operations.
     *
     * @type {Promotions}
     */
    this.Promotions = new Promotions(this._httpClient);

    /**
     * Service for managing site-related operations.
     *
     * @type {Site}
     */
    this.Site = new Site(this._httpClient);

    /**
     * Service for managing store-related operations.
     *
     * @type {Stores}
     */
    this.Stores = new Stores(this._httpClient);

    /**
     * Service for managing custom object-related operations.
     *
     * @type {CustomObjects}
     */
    this.CustomObjects = new CustomObjects(this._httpClient);

    /**
     * Service for managing content-related operations.
     *
     * @type {Content}
     */
    this.Contents = new Contents(this._httpClient);

    /**
     * Service for managing category-related operations.
     *
     * @type {Categories}
     */
    this.Categories = new Categories(this._httpClient);
  }
};

export default ShopApi;
