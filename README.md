<!-- PROJECT LOGO -->
<div align="center">
    <a href="https://github.com/BrinsilElias/sfcc-ocapi-client">
        <img src="./assets/logo.png" alt="Logo" width="80" height="80">
    </a>
    <h3 align="center">SFCC OCAPI Client</h3>
    <p align="center">
        A node package that let's you work with salesforce OCAPI like a breeze.
        <br />
        <br />
        <a href="https://sfcc-ocapi-client-demo.netlify.app/" target="_blank">View Demo</a>
        ·
        <a href="https://github.com/BrinsilElias/sfcc-ocapi-client/issues">Report Bug</a>
        ·
        <a href="https://github.com/BrinsilElias/sfcc-ocapi-client/issues">Request Feature</a>
        ·
        <a href="https://github.com/BrinsilElias/sfcc-ocapi-client/issues">Read Docs</a>
    </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About The Project</a>
            <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#built-with">Built With</a></li>
            </ul>
        </li>
        <li>
            <a href="#getting-started">Getting Started</a>
            <ul>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#configuration">Configuration</a></li>
            </ul>
        </li>
        <li>
            <a href="#usage">Usage</a>
            <ul>
                <li><a href="">Try it out</a></li>
                <li><a href="">Configuration</a></li>
            </ul>
        </li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#acknowledgments">Acknowledgments</a></li>
    </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

`sfcc-ocapi-client` is a node/npm package designed to streamline your integration with Salesforce's Open Commerce API, offering easy-to-use methods to interact with various endpoints.

### Features

* Simplified API connection setup with custom configurations.
* Pre-configured methods for different API endpoints like `Products`, `Promotions`, and `Customers`.
* Custom error handling and response parsing.
* Extendable structure for adding more API endpoints.

### Built With

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
- ![AJV](https://img.shields.io/badge/AJV-ea2845?style=for-the-badge&logo=ajv&logoColor=white)
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
- ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)
- ![Rollup.js](https://img.shields.io/badge/Rollup.js-EC4A3F?style=for-the-badge&logo=rollup.js&logoColor=white)
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## ⛳ Getting Started

### Prerequisites

Please ensure you have Node.js installed on your machine, version 18 or greater. You can download it from the official website [NodeJs](https://nodejs.org/).

### Setup

To begin using the `sfcc-ocapi-client`, choose your preferred package manager from the options below to install it in your project.

::: code-group

```sh
npm install sfcc-ocapi-client
```

```sh
pnpm add sfcc-ocapi-client
```

```sh
yarn add sfcc-ocapi-client
```

:::

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## ⚒️ Usage

### Try it out

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

> [!NOTE]
> This package supports both cjs (common js) and esm (es module) syntax. If you are using esm syntax in your project you can use import and export statements with this package.

```js
import { createOcapiInstance } from 'sfcc-ocapi-client';

const shopApi = new createOcapiInstance(config);
const productApi = shopApi.Products;

productApi.getProducts('product-id')
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
```
This will also work 😄

### Configuration

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
  clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
  authentication: {
    customer_type: 'credentials',
    customer_id: 'customer-email',
    customer_password: 'customer-password'
  },
  ocapiVersion: 'v24_1'
};

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## 🚧 Roadmap

See the [open issues](https://github.com/BrinsilElias/sfcc-ocapi-client/issues) for a list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## 🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **extremely appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## 📫 Contact

Brinsil Elias - [@BrinsilE](https://twitter.com/BrinsilE)

Project Link: [https://github.com/BrinsilElias/sfcc-ocapi-client](https://github.com/BrinsilElias/sfcc-ocapi-client.git)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Node.js](https://nodejs.org/)
* [Axios](https://github.com/axios/axios)
* [AJV](https://ajv.js.org/)
* [Babel](https://babeljs.io/)
* [Rollup.js](https://rollupjs.org/)
* [Jest](https://jestjs.io/)
* [Prettier](https://prettier.io/)