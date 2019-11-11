module.exports = (apikey) => {
  const axios = require('axios')
  return {
    post: {
      create: (data = {}) => axios.post(`http://18.219.198.133:8080/data?apikey=${apikey}`, data),
      get: (queries) => axios.get(`http://18.219.198.133:8080/data?apikey=${apikey}&${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`, data),
    }
  }
}