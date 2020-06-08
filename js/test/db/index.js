const config = require('../config')
const mysql = require('mysql')

const connection = mysql.createConnection(config.db)

const insertOne = (tb, row) => new Promise((res, rej) => {
  connection.query(
    `INSERT INTO ${tb} (${Object.keys(row).join()}) VALUES (${Object.values(row).join()})`,
    function (error, results) {
      if (error) return rej(error)
      res(results)
    }
  )
})

const init = (tb, data) => Promise.all(data.map((e) => insertOne(tb, e)))

const empty = (tb) => new Promise((res, rej) => {
  connection.query(`DELETE FROM ${tb}`, function (error, results) {
    if (error) return rej(error);
    res(results)
  })
})

const connect = () => new Promise((res, rej) => {
  connection.connect((err) => {
    if (err) return rej(err)
    res(connection)
  })
})

module.exports = {init, empty, connect }
