const util = require('../util')
const {describe} = require('mocha')
const assert = require('assert')
const conf = require('../config')

describe('account', function() {
  /* describe('create()', function() {
    it ('should create without error', async function() {
      assert.doesNotThrow(await run.pkg().account.create('test', 'a@a.a'))
    })
  }) */

  describe('get', function() {

    it ('should return account info', async function() {
      const acc = await util.ow.account.get(conf.acc.normal.id)
      assert.equal(acc.id, conf.acc.normal.id)
      assert.equal(acc.privateKey, conf.acc.normal.key)
    })
  })

  describe('update', function() {
    it ('should return account info', async function() {
      const acc = await util.ow.account.get(conf.acc.normal.id)
      const oldName = acc.oldName
      
      const updated = await util.ow.account.update(conf.acc.normal.id, 'Test')
      assert.equal(updated.name, 'Test')

      await util.ow.account.update(conf.acc.normal.id, oldName)
    })
  })

  /* describe('remove()', function() {
    it ('should create without error', async function() {
      assert.doesNotThrow(await run.pkg().account.remove(conf.acc.normal.id))
    })
  }) */

})