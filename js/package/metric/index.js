const err = require('../error')
const BASE_ENDPOINT = 'metric'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  const countCalls = async (customerId) => {
    try {
      const query = customerId ? `?customerId=${customerId}` : ''
      const { data } = await client.get(`${BASE_ENDPOINT}/amount/calls${query}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  const countFlows = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/amount/flows`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  const countTransactions = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/amount/transactions`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

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
