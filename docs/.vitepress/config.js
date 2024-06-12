import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Sfcc Ocapi Client',
  description: 'A client app to interact with SFCC OCAPI',
  head: [['link', { rel: 'icon', href: '/public/favicon.ico' }]],
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Get Started', link: '/get-started' },
      { text: 'Examples', link: '/examples' },
      {
        text: 'API References',
        collapsed: false,
        items: [
          {
            text: 'Shop API',
            collapsed: false,
            link: '/shop',
            items: [
              { text: 'Customers', link: '/shop/customers' },
              { text: 'Products', link: '/shop/products' },
              { text: 'Categories', link: '/shop/categories' },
              { text: 'Contents', link: '/shop/contents' },
              { text: 'Orders', link: '/shop/orders' },
              { text: 'Promotions', link: '/shop/promotions' },
              { text: 'Custom Object', link: '/shop/custom-objects' },
              { text: 'Site', link: '/shop/site' },
              { text: 'Stores', link: '/shop/stores' }
            ]
          }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/BrinsilElias/sfcc-ocapi-client' }]
  }
});
