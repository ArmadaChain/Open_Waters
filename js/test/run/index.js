const {beforeEach, afterEach, it} = require('mocha')
const config = require('./test/config')
const db = require('../db')
const api = require('supertest')(config.server.endpoint)
const fs = require('fs')
const path = require('path')

beforeEach (async function () {
  const key = this.currentTest.title.split('-')[0]
  const keyFile = `${key}.json`
  this.currentTest.data = JSON.parse(fs.readFileSync(path.join('data', keyFile)))
  if (fs.existsSync(path.join('init', keyFile))) {
    const init = JSON.parse(fs.readFileSync(path.join('init', keyFile)))
    this.currentTest.tbs = init.map((e) => e.table)
    return Promise.all(init.map((e) => db.init(key, e.table, e.data)))
  }
  this.currentTest.tbs = [].concat(this.currentTest.data.input.table)
  return Promise.resolve()
})

afterEach (async function () {
  return Promise.all(this.currentTest.tbs.map((e) => db.empty(this.currentTest.title.split('-')[0], e)))
})

const get = (key, desc, path, userRole = 'public') => {
  it(`${key}-${desc}`, function (done) {
    api.get(path)
        .set('Accept', 'application/json')
        .set('authorization', config.token[userRole])
        .expect(this.test.data.output.code, this.test.data.output.data, done)
  })
}

const post = (key, desc, path, userRole = 'public') => {
  it(`${key}-${desc}`, function (done) {
    api.post(path)
        .set('Accept', 'application/json')
        .set('authorization', config.token[userRole])
        .send(this.test.data.input.data)
        .expect(this.test.data.output.code, this.test.data.output.data, done)
  })
}

const put = (key, desc, path, userRole = 'public') => {
  it(`${key}-${desc}`, function (done) {
    api.put(path)
            .set('Accept', 'application/json')
            .set('authorization', config.token[userRole])
            .send(this.test.data.input.data)
            .expect(this.test.data.output.code, this.test.data.output.data, done)
  })
}

const remove = (key, desc, path, userRole = 'public') => {
  it(`${key}-${desc}`, function (done) {
    api.del(path)
            .set('Accept', 'application/json')
            .set('authorization', config.token[userRole])
            .expect(this.test.data.output.code, this.test.data.output.data, done)
  })
}

module.exports = { get, post, put, remove }
