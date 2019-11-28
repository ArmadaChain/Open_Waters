module.exports = (apikey) => {
  const axios = require('axios')
  return {
    post: {
      create: (data = {}) => axios.post('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com/data?apikey=${apikey}', data),
      get: (queries) => axios.get('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com/data?apikey=${apikey}&${Object.keys(queries).map((key) => '${key}=${queries[key]').join('&')}'),
    }
  }
}