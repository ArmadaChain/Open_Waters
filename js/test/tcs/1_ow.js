const run = require('../run')
const assert = require('assert')
describe('Open Water', function() {

  run.go(
    'tc_ow_1',
    'OW without API key should return only one create-account function',
    (done) => {
      var ow = run.pkg()
      assert.equal(Object.keys(ow).length, 1)
      assert.equal(Object.keys(ow.account).length, 1)
      done()
    }
  )

  run.go(
    'tc_ow_2',
    'OW with API key should return full functions',
     (done) => {
      var ow = run.pkg('fakeAPIKey')
      assert.ok(Object.keys(ow).length > 1)
      done()
    }
  )
})