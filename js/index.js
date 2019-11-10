module.exports = (apikey) => {
  const https = require('https')
  const requestOpt = {
    hostname: 'https://proxy-server.com',
    port: 443,
    path: `/armadachain/openwater?apikey=${apikey}`,
    headers: {'Content-Type': 'application/json'},
  }
  return {
    post: {
      create: (data = {}) => new Promise((resolve, reject) => {
        requestOpt.method = 'POST'
        let req = https.request(requestOpt, (res) => res.on('data', (d) => resolve(d)))
        req.on('error', reject)
        req.write(JSON.stringify(data))
        req.end()
      }),

      get: (queries) => new Promise((resolve, reject) => {
        requestOpt.method = 'GET'
        requestOpt.path += `&${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`
        let req = https.request(requestOpt, (res) => res.on('data', (d) => resolve(d)))
        req.on('error', reject)
        req.end()
      }),
    }
  }
}