const err = require('../error')
const { required } = require('../validation')
const BASE_ENDPOINT = 'data'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  /**
   * Push data
   * 
   * @async
   * @param {string} flowId 
   * @param {*} data 
   * @param {string} [memo] 
   * @param {boolean} [encrypt=false] - Should encrypt data before pushing?
   * @return {Promise<object>} Pushed data
   */
  const push = async (flowId = require(), data = required(), memo, encrypt = false) => {
    try {
      const body = { flowId, data: JSON.stringify(data) }
      if (memo) body.memo = memo

      const res = await client.post(`${BASE_ENDPOINT}/?encrypt=${encrypt}`, body)
      return res.data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Get data
   * 
   * @async
   * @param {string} flowId 
   * @return {Promise<object[]>} List of data
   */
  const get = async (flowId = required()) => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/${flowId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  return { push, get }
}
