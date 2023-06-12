const withLess = require('next-with-less')

function rewriteCruds(routes = []) {
  return routes
    .map(nextRoute => {
      const route = `/dashboard/${nextRoute}`
      return [
        {
          source: `${route}/add`,
          destination: `${route}/add/add`
        },
        {
          source: `${route}/edit/:id`,
          destination: `${route}/add/:id`
        }
      ]
    })
    .flat()
}

module.exports = withLess({
  compiler: {
    styledComponents: true
  },
  lessLoaderOptions: {},
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    APP_NAME: process.env.APP_NAME
  },
  rewrites() {
    return [
      ...rewriteCruds([
        'users',
        'associates',
        'collectiveAgreements',
        'publications',
        'veiculos',
        'importAssociates',
        'servicos'
      ])
    ]
  }
})
