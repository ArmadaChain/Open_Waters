const axios = require('axios')
const config = require('../config')
module.exports.init = (apikey) => {
  const options = {
    baseURL: 'http://localhost:8080',
    timeout: config.client.timeout,
  }

  if (apikey) {
    if (!options.headers) {
      options.headers = {}
    }
    options.headers['Authorization'] = apikey
  }

  const client = axios.create(options)
  return client
}
