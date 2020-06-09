const {ow} = require('../util')
const {describe} = require('mocha')
const assert = require('assert')

describe('data', function() {
  let flow = null

  before(async function() {
    flow = await ow.data.create(Math.random(), 'TRACK_TRACE')
  })
  
  after(async function() {
    if (flow) {
      await ow.flow.remove(flow.id)
    }
  })

  describe('push', function() {
    it ('should return flow info', async function() {
      const fl = await ow.flow.get(flow.id)
      assert.equal(flow.id, fl.id)
    })
  })

  describe('list', function() {
    it ('should return all flows', async function() {
      const flows = await ow.flow.list()
      assert.ok(flows.length > 0)
    })
  })

  describe('update', function() {
    it ('should return updated flow', async function() {
      const oldName = flow.name
      const newName = Math.random()

      const updated = await ow.flow.update(flow.id, newName)
      assert.equal(updated.name, newName)

      await ow.flow.update(flow.id, oldName)
    })
  })

})