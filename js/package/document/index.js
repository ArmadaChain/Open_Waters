const err = require('../error')
const { required } = require('../validation')
const fs = require('fs')
const BASE_ENDPOINT = 'documents'
const FormData = require('form-data')

module.exports = (cl) => {
  const client = cl || require('../client').init()

  /**
   * Upload document
   * 
   * @async
   * @param {string} filePath 
   * @return {Promise<object>} Uploaded document
   */
  const upload = async (filePath = required()) => {
    try {
      const formData = new FormData()
      formData.append('file', fs.createReadStream(filePath))
      const { data } = await client.post(`${BASE_ENDPOINT}/upload`, formData, { headers: formData.getHeaders() })
      return data
    } catch (error) {
      throw err.response(error)
    }
  }
  return { upload }
}
