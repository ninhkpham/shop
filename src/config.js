require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Shopping',
    description: 'Chuyên cung cấp các sản phẩm an toàn cho mẹ và bé',
    head: {
      titleTemplate: 'Shopping: %s',
      meta: [
        {name: 'description', content: 'Chuyên cung cấp các sản phẩm an toàn cho mẹ và bé.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Shopping'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Shopping'},
        {property: 'og:description', content: 'Chuyên cung cấp các sản phẩm an toàn cho mẹ và bé.'},
        {property: 'og:card', content: 'summary'},
        // {property: 'og:site', content: '@erikras'},
        // {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
