var assert = require('assert')
var conf = require('../conf')
var ow = require('../../index')(conf.apikey)

describe('Account', function() {
  describe('# get account', function() {
    it('should return account info when get account', async function() {
      var acc = await ow.account.get('CU0000002')
      assert.equal(acc.id, 'CU0000002')
      assert.equal(acc.privateKey, conf.apikey)
    })
  })

  describe('# update account', function() {
    it('should return newly updated account when update company to ABC', async function() {
      var acc = await ow.account.update('CU0000002', null, null, 'ABC')
      assert.equal(acc.company, 'ABC')
    })

    it('should return newly updated account when update company to Armada Chain', async function() {
      var acc = await ow.account.update('CU0000002', null, null, 'Armada Chain')
      assert.equal(acc.company, 'Armada Chain')
    })
  })
})