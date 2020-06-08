const config = require('./test/config')
const Sequelize = require('sequelize')
const logger = require('../logger')

const init = (key, tb, data) => {
  let sequelize = new Sequelize(config.db.uri,{logging: false})
  return sequelize.authenticate()
    .then(() => Promise.all(data.map((e) => sequelize.query(`INSERT INTO ${tb} (${Object.keys(e).join()}) VALUES (${Object.values(e).join()})`))))
    .catch(err => logger.error(`init error in testcase: ${key}`, err))
    .finally(() => sequelize.close())
}

const empty = (key, tb) => {
  let sequelize = new Sequelize(config.db.uri)
  return sequelize.authenticate()
    .then(() => sequelize.query(`DELETE FROM ${tb}`))
    .catch(err => logger.error(`empty error in testcase: ${key}`, err))
    .finally(() => sequelize.close())
}

const connect = () => {
  let sequelize = new Sequelize(config.db.uri)
  return sequelize.authenticate()
}

module.exports = {init, empty, connect }
