module.exports = (apikey) => {
  const http = require('http')
  const requestOpt = {
    hostname: 'localhost',
    port: 8080,
    path: `data?apikey=${apikey}`,
    headers: {'Content-Type': 'application/json'},
  }
  return {
    post: {
      create: (data = {}) => new Promise((resolve, reject) => {
        requestOpt.method = 'POST'
        let req = http.request(requestOpt, (res) => res.on('data', (d) => resolve(d)))
        req.on('error', reject)
        req.write(JSON.stringify(data))
        req.end()
      }),

      get: (queries) => new Promise((resolve, reject) => {
        requestOpt.method = 'GET'
        requestOpt.path += `&${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`
        let req = http.request(requestOpt, (res) => res.on('data', (d) => resolve(d)))
        req.on('error', reject)
        req.end()
      }),
    }
  }
}