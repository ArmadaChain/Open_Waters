const { ow } = require('../util')
const { describe } = require('mocha')
const assert = require('assert')

describe('data', function () {
  let flow = null
  let pushData = null
  const plainData = { "autotest": "test data" }

  before(async function () {
    flow = await ow.flow.create(Math.random(), 'TRACK_TRACE')
  })

  after(async function () {
    if (flow) {
      await ow.flow.remove(flow.id)
    }
  })

  describe('push', function () {
    it('should send data to hedera successfully', async function () {
      const memo = "autotest"
      pushData = await ow.data.push(flow.id, plainData, memo, false)
      assert.equal(pushData.memo, memo)
    })
  })

  describe('get', function () {
    it('should get data from hedera correctly', async function () {
      let rs = await ow.data.get(flow.id)
      rs = rs.map(e => e.data)
      assert.ok(rs.includes(JSON.stringify(plainData)))
    })
  })
})