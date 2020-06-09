const util = require('../util')
const assert = require('assert')
describe('Open Water', function() {

  describe('without API Key', function() {
    it ('should return only one create-account function', async function() {
      var ow = util.pkg()
      assert.equal(Object.keys(ow).length, 1)
      assert.equal(Object.keys(ow.account).length, 1)
    })
  })

  describe('with API Key', function() {
    it ('should return full functions', async function() {
      var ow = util.pkg('fakeAPIKey')
      assert.ok(Object.keys(ow).length > 1)
    })
  })

})