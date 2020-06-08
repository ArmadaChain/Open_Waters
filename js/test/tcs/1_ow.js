const run = require('../run')
describe('Open Water', function() {

  run.go(
    '# without API key',
    'should return ow client with only one create-account function',
    () => {
      var ow = run.pkg()
      assert.equal(Object.keys(ow).length, 1)
      assert.equal(Object.keys(ow.account).length, 1)
    }
  )

  run.go(
    '# with an API key',
    'should return ow client with full funtions',
    () => {
      var ow = run.pkg('fakeAPIKey')
      assert.ok(Object.keys(ow).length > 1)
    }
  )
})