const response = (err) => new Error(err.response.data)

module.exports = {response}
