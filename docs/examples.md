# Examples

Welcome to the Examples page for `sfcc-ocapi-client`. This page provides various sample implementations to help you get started with integrating Salesforce's Open Commerce API in your projects. Each example is designed to show you how to use the client effectively for common tasks.

## Getting Started

Before diving into the examples, ensure that you have the client installed and initialized in your project as described in the [Get Started](./get-started.html) section.

## Example 1: Fetching Products

This example demonstrates how to fetch a list of products using the `Products` sub-module.

```js
const { getShopApi } = require('sfcc-ocapi-client');
// Read below to know about the configuration object
const config = require('./config');

const shopApi = getShopApi(config);
const productApi = shopApi.Products;

(async () => {
  try {
    const product = await productApi.getProductById('product-id');
    console.log(product);
  } catch (error) {
    console.log(error);
  }
})();
```

## Example 2: Fetching Product with Options
This example demonstrates how to fetch a product by ID using the `getProductById` method and passing options as an object with query strings.

```js
const { getShopApi } = require('sfcc-ocapi-client');
// Read below to know about the configuration object
const config = require('./config');
const shopApi = getShopApi(config);
const productApi = shopApi.Products;
(async () => {
  try {
    const productId = 'product-id';
    const options = {
      params: {
        expand: ['availability', 'images', 'links']
      }
    };
    const product = await productApi.getProductById(productId, options);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
})();
```

## Example 3: Fetching Multiple Products
This example demonstrates how to fetch multiple products by passing an array of product IDs as parameters to the `getProducts` method.

```js
const { getShopApi } = require('sfcc-ocapi-client');
// Read below to know about the configuration object
const config = require('./config');
const shopApi = getShopApi(config);
const productApi = shopApi.Products;
(async () => {
  try {
    const productIds = ['product-id-1', 'product-id-2', 'product-id-3'];
    const products = await productApi.getProductsByIds(productIds);
    console.log(products);
  } catch (error) {
    console.log(error);
  }
})();
```

In this example, we pass an `options` object to the `getProductById` method. The `options` object contains a `params` property, which is an object that holds the query strings to be used for the API call. In this case, we pass `color` and `size` as query strings with their respective values.

Make sure to handle any errors that may occur during the API call to ensure smooth execution of your code.


## Additional Tips
* Always handle errors in your API calls to prevent crashes and unexpected behavior.
* Utilize the flexible configuration options of sfcc-ocapi-client to tailor the client to your specific needs.