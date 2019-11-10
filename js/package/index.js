module.exports = (apikey) => {
  const axios = require('axios')
  return {
    post: {
      create: (data = {}) => axios.post(`http://localhost:8080/data?apikey=${apikey}`, data),
      get: (queries) => axios.post(`http://localhost:8080/data?apikey=${apikey}&${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`, data),
    }
  }
}