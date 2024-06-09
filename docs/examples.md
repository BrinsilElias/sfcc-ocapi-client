# Examples

Welcome to the Examples page for `sfcc-ocapi-client`. This page provides various sample implementations to help you get started with integrating Salesforce's Open Commerce API in your projects. Each example is designed to show you how to use the client effectively for common tasks.

## Getting Started

Before diving into the examples, ensure that you have the client installed and initialized in your project as described in the [Get Started](./get-started.html) section.

## Example 1: Fetching Products

This example demonstrates how to fetch a list of products using the `Products` sub-module.

```js
const { createOcapiInstance } = require('sfcc-ocapi-client');
const shopApi = createOcapiInstance({ config: your-config-here });

const productApi = shopApi.Products
productApi.getProductById('productId')
  .then(products => console.log(products))
  .catch(error => console.error('Failed to fetch products:', error));
```

## Additional Tips
* Always handle errors in your API calls to prevent crashes and unexpected behavior.
* Utilize the flexible configuration options of sfcc-ocapi-client to tailor the client to your specific needs.