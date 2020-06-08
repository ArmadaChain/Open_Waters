const {beforeEach, afterEach, it, describe} = require('mocha')
const db = require('../db')
const fs = require('fs')
const path = require('path')
const pkg = require('../../package')

beforeEach (async function () {
  const key = this.currentTest.title.split('-')[0]
  console.log('key', this.currentTest)
  const keyFile = `${key}.json`
  this.currentTest.data = JSON.parse(fs.readFileSync(path.join('data', keyFile)))
  if (fs.existsSync(path.join('init', keyFile))) {
    const init = JSON.parse(fs.readFileSync(path.join('init', keyFile)))
    this.currentTest.tbs = init.map((e) => e.table)
    return await Promise.all(init.map((e) => db.init(key, e.table, e.data)))
  }
  this.currentTest.tbs = [].concat(this.currentTest.data.input.table)
})

afterEach (async function () {
  if (!this.currentTest) return
  return await Promise.all(this.currentTest.tbs.map((e) => db.empty(this.currentTest.title.split('-')[0], e)))
})

const go = (key, desc, handl) => {
  describe(key, function() {
    it(desc, handl)
  })
}

module.exports = { go, pkg }
