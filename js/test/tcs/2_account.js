const util = require('../util')
const { describe } = require('mocha')
const assert = require('assert')
const conf = require('../config')

describe('account', function () {
  /*describe('create()', function() {
    it ('should create without error', async function() {
      const acc = await util.ow.account.create('test', 'a@a.a')
      console.log(acc)
    })
  })*/

  describe('my account', function () {

    it('should return associated account info', async function () {
      const acc = await util.ow.account.myAccount()
      assert.equal(acc.id, conf.acc.normal.id)
      assert.equal(acc.privateKey, conf.acc.normal.key)
    })
  })

  describe('get', function () {

    it('should return account info', async function () {
      const acc = await util.ow.account.get(conf.acc.normal.id)
      assert.equal(acc.id, conf.acc.normal.id)
      assert.equal(acc.privateKey, conf.acc.normal.key)
    })
  })

  describe('get another account', function () {

    it('should return error', async function () {
      await assert.rejects(() => util.ow.account.get('CU000000010'))
    })
  })

  describe('update', function () {
    it('should return updated account', async function () {
      const acc = await util.ow.account.get(conf.acc.normal.id)
      const oldName = acc.name

      const updated = await util.ow.account.update(conf.acc.normal.id, 'Test')
      assert.equal(updated.name, 'Test')

      await util.ow.account.update(conf.acc.normal.id, oldName)
    })
  })

  describe('remove()', function() {
    it ('should return error', async function() {
      assert.throws(() => util.ow.account.remove(conf.acc.normal.id), 'TypeError: util.ow.account.remove is not a function')
    })
  })

})