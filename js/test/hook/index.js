const mocha = require('mocha')
const db = require('../db')
const logger = require('../logger')

const retryConnect = (tries) => {
  if (tries <= 0) {
    return Promise.reject(new Error(`Can not connect with database`))
  }
  return db.connect()
    .catch(() => {
      return new Promise((rs) => setTimeout(() => rs(), 1000)).then(() => retryConnect(--tries))
    })
}

mocha.before((done) => {
  let noTries = 5
  retryConnect(noTries)
    .then(done)
    .catch((e) => logger.error(`retryConnect error`, e))
})
