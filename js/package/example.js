const openWater = require('./index')

const publicExample = async () => {
  // Init an open water client without apikey
  const client = openWater()

  // The return client exports only one function "account.create"
  const account = await client.account.create('oanhduong', 'thanhoanh.se@gmail.com', 'Oanh Duong', 'ArmadaChain')
  console.log(account.privateKey)
}

const authorizedExample = async () => {
  // Init an open water client with an apikey
  const client = openWater('eiBo5pD7PRUvBpnOKa63')

  // The retun client exports all functions
  const flows = await client.flow.create("flow_test_1", "DATA_AUDIT", null, ['CU0000003'])
  console.log(await client.flow.list())
  console.log(await client.flow.remove(flows.id))
  console.log(await client.flow.list())
}

publicExample()
authorizedExample()