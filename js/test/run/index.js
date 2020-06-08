const {beforeEach, afterEach, it, describe} = require('mocha')
const db = require('../db')
const fs = require('fs')
const path = require('path')
const pkg = require('../../package')

beforeEach (async function () {
  const key = this.currentTest.title.split(':')[0]
  this.currentTest.key = key
  this.currentTest.tbs = []
  
  const keyFile = `${key}.json`
  const dataPath = path.join('data', keyFile)
  const initPath = path.join('init', keyFile)

  if (fs.existsSync(dataPath) && fs.existsSync(initPath)) {
    this.currentTest.data = JSON.parse(fs.readFileSync(dataPath))
    const init = JSON.parse(fs.readFileSync(initPath))
    this.currentTest.tbs = init.map((e) => e.table)
    this.currentTest.tbs = [].concat(this.currentTest.data.input.table)
    return await Promise.all(init.map((e) => db.init(key, e.table, e.data)))
  }
})

afterEach (async function () {
  return await Promise.all(this.currentTest.tbs.map((e) => db.empty(this.currentTest.key, e)))
})

const go = (key, desc, handl) => it(`${key}:${desc}`, handl)

module.exports = { go, pkg }
