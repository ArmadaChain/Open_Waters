const OW = require('../../package')
const assert = require('assert')

const testCreate = async () => {
  const nonApi = OW()
  const newAcc = await nonApi.account.create('testing', 'test@a.a', 'Oanh', 'Armada')
  console.log('New account', newAcc)
}

testCreate()