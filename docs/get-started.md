---
title: Get Started
next: Examples
---

# Get started

## Installation

To begin using the `sfcc-ocapi-client`, choose your preferred package manager from the options below to install it in your project.

::: code-group

```sh [npm]
npm install sfcc-ocapi-client
```

```sh [pnpm]
pnpm add sfcc-ocapi-client
```

```sh [yard]
yarn add sfcc-ocapi-client
```

:::

## Try it out

Congratulations! You've successfully set up sfcc-ocapi-client 🎉. Let’s make your first API call to see it in action:

```js
const { createOcapiInstance } = require('sfcc-ocapi-client');
// Read below to know about the configuration object
const config = require('./config');

const shopApi = new createOcapiInstance(config);
const productApi = shopApi.Products;

productApi.getProducts('product-id')
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
```

::: tip
This package supports both cjs (common js) and esm (es module) syntax. If you are using esm syntax in your project you can use import and export statements with this package.

```js
import { createOcapiInstance } from 'sfcc-ocapi-client'; // [!code focus]

const shopApi = new createOcapiInstance(config);
const productApi = shopApi.Products;

productApi.getProducts('product-id')
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
```
This will also work 😄
:::

## Configuration

To utilize sfcc-ocapi-client, you need to pass a configuration object when creating an instance. This configuration is crucial as it defines how the client will interact with Salesforce's OCAPI.

Here’s what typically goes into the config object:

* `baseURL`: The base URL of the Salesforce API you wish to connect to.
* `clientId`: Your Salesforce client ID.
* `ocapiVersion`: The ocapi version for accessing resources
* `timeout`: The timeout duration for each api call
* `headers`: The headers to include in the api request

```js
const config = {
  baseURL: 'https://instance/s/siteId/dw/resource/ocapi-version',
  clientId: 'aeb8b4af-749b-488d-94be-d5c85fab699c',
  authentication: {
    customer_type: 'credentials',
    customer_id: 'brinsilelias01@gmail.com',
    customer_password: '143@Physics'
  },
  ocapiVersion: 'v24_1'
};
```
