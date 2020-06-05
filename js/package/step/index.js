const err = require('../error')
const {required} = require('../validation')
const BASE_ENDPOINT = 'steps'


module.exports = (cl) => {
  const client = cl || require('../client').init()
  const create = async (stepNum = required(), validator = required(), flow = required(), documents, dataSet, data) => {
    try {
      const step = {stepNum, validator, flow}
      if (documents) step.documents = documents
      if (dataSet) step.dataSet = dataSet
      if (data) step.data = data
  
      const res = await client.post(`${BASE_ENDPOINT}/`, step)
      return res.data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const get = async (stepId = required()) => {
    try {
      const {data} = await client.get(`${BASE_ENDPOINT}/${stepId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const listByFlow = async (flowId = required(), validator) => {
    try {
      const query = {}
      if (validator) query.validator = validator
      const {data} = await client.get(`flows/${flowId}/steps`, {query})
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const update = async (stepId = required(),stepNum, validator, flow, documents, dataSet, data) => {
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

  const validate = async (stepId = required(), isCompleted) => {
    try {
      const result = await client.put(`${BASE_ENDPOINT}/${stepId}/validate/${isCompleted}`)
      return result.data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const remove = async (stepId = required()) => {
    const removed = get(stepId)
    try {
      await client.delete(`${BASE_ENDPOINT}/${stepId}`)
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }
  return {create, get, listByFlow, update, validate, remove}
}
