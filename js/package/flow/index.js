const err = require('../error')
const {required} = require('../validation')
const BASE_ENDPOINT = 'flows'


module.exports = (cl) => {
  const client = cl || require('../client').init()

  const create = async (name = required(), flowType = required(), descriptions, partners) => {
    try {
      const flow = {name, flowType}
      if (descriptions) {
        flow.descriptions = descriptions
      }
      if (partners instanceof Array && partners.length > 0) {
        flow.partners = partners
      }
  
      const {data} = await client.post(BASE_ENDPOINT, flow)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const get = async (flowId = required()) => {
    try {
      const params = {flowId}
      const {data} = await client.get(BASE_ENDPOINT, {params})
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const list = async () => {
    try {
      const {data} = await client.get(BASE_ENDPOINT)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const update = async (flowId = required(), name, descriptions, partners) => {
    try {
      const flow = {}
      if (name) flow.name = name
      if (descriptions) flow.descriptions = descriptions
      if (partners) flow.partners = partners
  
      const params = {flowId} 
      const {data} = await client.put(BASE_ENDPOINT, {data: flow, params})
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  
  const remove = async (flowId = required()) => {
    const removed = get(flowId)
    try {
      const params = {flowId}
      await client.delete(BASE_ENDPOINT, {params})
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }

  return {create, get, list, update, remove}
} 
