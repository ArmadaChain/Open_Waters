const axios = require('axios')
let arr = new Array(100).fill(1)
Promise.all(arr.map((e) => {
  return axios.post('http://localhost:8080/data?apikey=XriiU6sm19UUCJwm15ky', {
    "activityId": 123,
    "data":"{OW TESTINGADSFJA DFsdf}",
    "memo": "checking"
  })
}))
  .then((rs) => {
    if (rs.find((e) => e.status != 200)) {
      console.log('has-error', e)
    }
    console.log('done')
  })
  .catch((err) => console.error('has-error', err))