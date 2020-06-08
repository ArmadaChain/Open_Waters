var assert = require('assert')
var pkg = require('../../index')
describe('Open Water', function() {

  describe('# without API key', function() {
    it('should return ow client with only one create-account function', function() {
      var ow = pkg()
      assert.equal(Object.keys(ow).length, 1)
      assert.equal(Object.keys(ow.account).length, 1)
    })
  })

  describe('# with an API key', function() {
    it('should return ow client with full funtions', function() {
      var ow = pkg('fakeAPIKey')
      assert.ok(Object.keys(ow).length > 1)
    })
  })

})