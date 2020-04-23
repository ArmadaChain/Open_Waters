const axios = require('axios')
const config = require('../config')
const options = {
  baseURL: 'http://consensus.us-east-2.elasticbeanstalk.com',
  timeout: config.client.timeout,
}
const client = axios.create(options)
module.exports = client
