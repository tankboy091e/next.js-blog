/* eslint-disable global-require */
module.exports = {
  excludeFile: (str) => /\script\*.js/.test(str),
  webpack: (config, {
    isServer,
  }) => {
    if (isServer) {
      require('./script/sitemap.js')
    }
    return config
  },
  env: {
    ORIGIN: process.env.ORIGIN,
    API_URL: process.env.API_URL,
  },
}
