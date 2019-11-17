module.exports = (apikey) => {
  const axios = require('axios')
  return {
    post: {
      create: (data = {}) => axios.post(`http://3.132.236.222/data?apikey=${apikey}`, data),
      get: (queries) => axios.get(`http://3.132.236.222/data?apikey=${apikey}&${Object.keys(queries).map((key) => `${key}=${queries[key]}`).join('&')}`),
    }
  }
}