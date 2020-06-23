const err = require('../error')
const { required } = require('../validation')
const BASE_ENDPOINT = 'flows'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  /**
   * Create flow
   * 
   * @async
   * @param {string} name 
   * @param {string} flowType - Just support 2 types: DATA_AUDIT & TRACK_TRACE
   * @param {string} [descriptions] 
   * @param {string[]} [partners] - List of IDs of partners
   * @return {Promise<object>} Created flow
   */
  const create = async (name = required(), flowType = required(), descriptions, partners) => {
    try {
      const flow = { name, flowType }
      if (descriptions) {
        flow.descriptions = descriptions
      }
      if (partners instanceof Array && partners.length > 0) {
        flow.partners = partners
      }

      const { data } = await client.post(`${BASE_ENDPOINT}/`, flow)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Get flow
   * 
   * @async
   * @param {string} flowId 
   * @return {Promise<object>} Flow
   */
  const get = async (flowId = required()) => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/${flowId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * List all flows
   * 
   * @async
   * @return {Promise<object[]>} List of flows
   */
  const list = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Update flow
   * 
   * @param {string} flowId 
   * @param {string} [name] 
   * @param {string} [descriptions] 
   * @param {string[]} partners - List of IDs of partners
   * 
   * @return {Promise<object>} Updated flow
   */
  const update = async (flowId = required(), name, descriptions, partners) => {
    try {
      const flow = {}
      if (name) flow.name = name
      if (descriptions) flow.descriptions = descriptions
      if (partners) flow.partners = partners

      const { data } = await client.put(`${BASE_ENDPOINT}/${flowId}`, flow)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Remove flow
   * 
   * @async
   * @param {string} flowId 
   * @return {Promise<object>} Removed flow
   */
  const remove = async (flowId = required()) => {
    const removed = get(flowId)
    try {
      await client.delete(`${BASE_ENDPOINT}/${flowId}`)
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }

  return { create, get, list, update, remove }
} 
