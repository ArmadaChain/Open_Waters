const err = require('../error')
const BASE_ENDPOINT = 'metric'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  /**
   * Count number of calls
   * 
   * @async
   * @param {string} [customerId] 
   * @return {Promise<number>} Number of calls
   */
  const countCalls = async (customerId) => {
    try {
      const query = customerId ? `?customerId=${customerId}` : ''
      const { data } = await client.get(`${BASE_ENDPOINT}/amount/calls${query}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Count number of flows
   * 
   * @async
   * @return {Promise<number>} Number of flows
   */
  const countFlows = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/amount/flows`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Count number of transactions
   * 
   * @async
   * @return {Promise<number>} Number of transactions 
   */
  const countTransactions = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/amount/transactions`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Get the last called function
   * 
   * @async
   * @param {string} [customerId] 
   * @return {Promise<object>} Last function 
   */
  const lastCall = async (customerId) => {
    try {
      const query = customerId ? `?customerId=${customerId}` : ''
      const { data } = await client.get(`${BASE_ENDPOINT}/last${query}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  return { countCalls, countFlows, countTransactions, lastCall }
}
