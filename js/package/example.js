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
  const client = openWater('f4MCesAHYatVx5AQT2wn')

  // The retun client exports all functions
  // For example, get all flows
  const flows = await client.flow.list()
  console.log(flows)
}

publicExample()
authorizedExample()