const client = require('../client')
const err = require('../error')
const {required} = require('../validation')
const fs = require('fs')
const BASE_ENDPOINT = 'documents'

const upload = async (filePath = required()) => {
  try {
    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath))
    const {data} = await client.post(`${BASE_ENDPOINT}/upload`,
      {
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
    return data
  } catch (error) {
    throw err.response(error)
  }
}


module.exports = {upload}
