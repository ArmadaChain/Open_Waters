const err = require('../error')
const { required } = require('../validation')
const BASE_ENDPOINT = 'datasets'


module.exports = (cl) => {
  const client = cl || require('../client').init()
  const create = async (keysAndTypes = required(), name = required()) => {
    try {
      const fieldKeys = Object.keys(keysAndTypes)
      const fieldTypes = fieldKeys.map((k) => keysAndTypes[k])
      const dataset = { fieldKeys, fieldTypes, name }

      const { data } = await client.post(`${BASE_ENDPOINT}/`, dataset)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  const get = async (dataSetId = required()) => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/${dataSetId}`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  const list = async () => {
    try {
      const { data } = await client.get(`${BASE_ENDPOINT}/`)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  const update = async (dataSetId = required(), keysAndTypes, name) => {
    try {
      const dataset = {}
      if (name) dataset.name = name
      if (keysAndTypes) {
        dataset.fieldKeys = Object.keys(keysAndTypes)
        dataset.fieldTypes = dataset.fieldKeys.map((k) => keysAndTypes[k])
      }

      const { data } = await client.put(`${BASE_ENDPOINT}/${dataSetId}`, dataset)
      return data
    } catch (error) {
      throw err.response(error)
    }
  }

  const remove = async (dataSetId = required()) => {
    const removed = get(dataSetId)
    try {
      await client.delete(`${BASE_ENDPOINT}/${dataSetId}`)
      return removed
    } catch (error) {
      throw err.response(error)
    }
  }
  return { create, get, list, update, remove }
}
