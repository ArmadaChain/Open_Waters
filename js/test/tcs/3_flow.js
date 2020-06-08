var assert = require('assert')
var conf = require('../conf')
var ow = require('../../index')(conf.apikey)

describe('Flow', function() {
  describe('# create a flow', function() {
    it('should return flow info when create TRACK_TRACE flow', async function() {
      var flow = await ow.flow.create('Flow_Test', 'TRACK_TRACE', "Testing Flow")
      assert.equal(flow.name, 'Flow_Test')
      assert.equal(flow.partners.length, 1)
    })
  })
})