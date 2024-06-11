# Examples

Welcome to the Examples page for `sfcc-ocapi-client`. This page provides various sample implementations to help you get started with integrating Salesforce's Open Commerce API in your projects. Each example is designed to show you how to use the client effectively for common tasks.

## Getting Started

Before diving into the examples, ensure that you have the client installed and initialized in your project as described in the [Get Started](./get-started.html) section.

## Example 1: Fetching Products

This example demonstrates how to fetch a list of products using the `Products` sub-module.

```js
const { ShopApi } = require('sfcc-ocapi-client');
const client = new ShopApi({ config: your-config-here });

client.Products.getProducts({ params: { limit: 10 } })
  .then(products => console.log(products))
  .catch(error => console.error('Failed to fetch products:', error));
```

## Example 2: Creating a Promotion

Learn how to create a new promotion using the Promotions sub-module.

```js
const client = new ShopApi({ config: your-config-here });

client.Promotions.createPromotion({
  name: 'Summer Sale',
  discountType: 'percentage',
  discountValue: 20
})
.then(promotion => console.log('Promotion created:', promotion))
.catch(error => console.error('Failed to create promotion:', error));
```

## Example 3: Updating Customer Details

Update customer details using the Customers sub-module.

```js
const client = new ShopApi({ config: your-config-here });

client.Customers.updateCustomer('customerId123', {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com'
})
.then(updatedCustomer => console.log('Customer updated:', updatedCustomer))
.catch(error => console.error('Failed to update customer:', error));
```

## Additional Tips
* Always handle errors in your API calls to prevent crashes and unexpected behavior.
* Utilize the flexible configuration options of sfcc-ocapi-client to tailor the client to your specific needs.