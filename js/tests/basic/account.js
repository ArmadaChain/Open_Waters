const OW = require('../../package')

const testCreate = async () => {
  // TODO: Don't run many times
  const nonApi = OW()
  const newAcc = await nonApi.account.create('kent', 'kent@armadachain.io', 'Kent Makishima', 'Armada Chain')
  console.log('New account', newAcc)
}

const test = async () => {
  const apiCl = OW('WmKM7K5euWyqejiADCU0')

  // Get customer
  console.log(await apiCl.account.get('CU0000002'))

  // Update customer
  console.log(await apiCl.account.update('CU0000002', 'Oanh Duong'))

}


test()