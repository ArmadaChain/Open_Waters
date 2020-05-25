const err = require('../error')
const {required} = require('../validation')
const BASE_ENDPOINT = 'customers'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  const create = async (username = required(), email = required(), name, company) => {
    try {
      const acc = {username, email}
      if (name) acc.name = name
      if (company) acc.company = company
  
      const {data} = await client.post(`public/${BASE_ENDPOINT}`, acc)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const get = async (accountId = required()) => {
    try {
      const {data} = await client.get(`${BASE_ENDPOINT}/${accountId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const update = async (accountId = required(), name, email, company) => {
    try {
      const acc = {}
      if (name) acc.name = name
      if (email) acc.email = company
      if (company) acc.company = company
  
      const {data} = await client.put(`${BASE_ENDPOINT}/${accountId}`, acc)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const remove = async (accountId = required()) => {
    const removed = get(accountId)
    try {
      await client.delete(`${BASE_ENDPOINT}/${accountId}`)
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }
  return {create, get, update, remove}
}
