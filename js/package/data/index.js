const err = require('../error')
const {required} = require('../validation')
const BASE_ENDPOINT = 'data'


module.exports = (cl) => {
  const client = cl || require('../client').init()
  const push = async (flowId = require(), data = required(), memo, encrypt = false) => {
    try {
      const body = {flowId, data}
      if (memo) body.memo = memo
  
      const {data} = await client.post(`${BASE_ENDPOINT}?encrypt=${encrypt}`, body)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const get = async (flowId = required()) => {
    try {
      const {data} = await client.get(`${BASE_ENDPOINT}/${flowId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  return {push, get}
}
