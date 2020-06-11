const err = require('../error')
const { required } = require('../validation')
const BASE_ENDPOINT = 'steps'

module.exports = (cl) => {
  const client = cl || require('../client').init()

  /**
   * Create step
   * 
   * @async
   * @param {number} stepNum - Order number of step
   * @param {string} validator - ID of validator
   * @param {string} flow - ID of associated flow
   * @param {string[]} [documents] - List of document's IDs
   * @param {string} [dataSet] - ID of dataset which step belongs to
   * @param {*} [data] - Data of step, followed by dataset's rule
   * @return {Promise<object>} Created step
   */
  const create = async (stepNum = required(), validator = required(), flow = required(), documents, dataSet, data) => {
    try {
      const step = { stepNum, validator, flow }
      if (documents) step.documents = documents
      if (dataSet) step.dataSet = dataSet
      if (data) step.data = data

      const res = await client.post(`${BASE_ENDPOINT}/`, step)
      return res.data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Get step
   * 
   * @async
   * @param {string} stepId 
   * @return {Promise<object>} Step
   */
  const get = async (stepId = required()) => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/${stepId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }


  /**
   * List all steps of flow
   * 
   * @async
   * @param {string} flowId 
   * @param {string} [validator] 
   * @return {Promise<object[]>} List of steps
   */
  const listByFlow = async (flowId = required(), validator) => {
    try {
      const query = {}
      if (validator) query.validator = validator
      const { data } = await client.get(`flows/${flowId}/steps`, { query })
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Update step
   * 
   * @async
   * @param {string} stepId 
   * @param {number} [stepNum] - Order number of step
   * @param {string} [validator] - ID of validator
   * @param {string} [flow] - ID of associated flow
   * @param {string[]} [documents] - List of document's IDs
   * @param {string} [dataSet] - ID of dataset which step belongs to
   * @param {*} [data] - Data of step, followed by dataset's rule
   * @return {Promise<object>} Updated step
   */
  const update = async (stepId = required(), stepNum, validator, flow, documents, dataSet, data) => {
    try {
      const step = {}
      if (stepNum) step.stepNum = stepNum
      if (validator) step.validator = validator
      if (flow) step.flow = flow
      if (documents) step.documents = documents
      if (dataSet) step.dataSet = dataSet
      if (data) step.data = data

      const result = await client.put(`${BASE_ENDPOINT}/${stepId}`, step)
      return result.data
    } catch (error) {
      throw err.response(error)
    }
  }

  /**
   * Mark a step is validated or not
   * 
   * @async
   * @param {string} stepId 
   * @param {boolean} [isCompleted=true] 
   * @return {Promise<object>} Updated step
   */
  const validate = async (stepId = required(), isCompleted = true) => {
    try {
      const result = await client.put(`${BASE_ENDPOINT}/${stepId}/validate/${isCompleted}`)
      return result.data
    } catch (error) {
      throw err.response(error)
    }
  }


  /**
   * Remove step
   * 
   * @async
   * @param {string} stepId 
   * @return {Promise<object>} Removed step
   */
  const remove = async (stepId = required()) => {
    const removed = get(stepId)
    try {
      await client.delete(`${BASE_ENDPOINT}/${stepId}`)
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }
  return { create, get, listByFlow, update, validate, remove }
}
