const err = require('../error')
const { required } = require('../validation')
const BASE_ENDPOINT = 'customers'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  /**
   * Create account
   * 
   * @async
   * @param {string} username
   * @param {string} email
   * @param {string} [name]
   * @param {string} [company]
   * @return {Promise<object>} Account's information
   */
  const create = async (username = required(), email = required(), name, company) => {
    try {
      const acc = { username, email }
      if (name) acc.name = name
      if (company) acc.company = company

      const { data } = await client.post(`${BASE_ENDPOINT}/`, acc)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Get account by ID
   * 
   * @async
   * @param {string} accountId
   * @return {Promise<object>} Account's information
   */
  const get = async (accountId = required()) => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/${accountId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Get own account
   * 
   * @async
   * @return {Promise<object>} Account's information
   */
  const myAccount = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/my/account`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Update account
   * 
   * @async
   * @param {string} accountId
   * @param {string} [name]
   * @param {string} [email]
   * @param {string} [company]
   * @async
   * @return {Promise<object>} Updated account's information
   */
  const update = async (accountId = required(), name, email, company) => {
    try {
      const acc = {}
      if (name) acc.name = name
      if (email) acc.email = company
      if (company) acc.company = company

      const { data } = await client.put(`${BASE_ENDPOINT}/${accountId}`, acc)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Remove account
   * 
   * @async
   * @param {string} accountId 
   * @return {Promise<object>} Removed account's information
   */
  const remove = async (accountId = required()) => {
    const removed = get(accountId)
    try {
      await client.delete(`${BASE_ENDPOINT}/${accountId}`)
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }
  return { create, get, update, remove, myAccount }
}
