const openWater = require('./index')

const publicExample = async () => {
  // Init an open water client without apikey
  const client = openWater()

  // The return client exports only one function "account.create"
  const account = await client.account.create('kentm', 'kent@armadachain.com', 'Kent Makishima', 'ArmadaChain')
  console.log(account.privateKey)
}

const authorizedExample = async () => {
  // Init an open water client with an apikey
  const client = openWater('')

  // The retun client exports all functions
  // For example, get all flows
  // const flows = await client.flow.create("testFlow", "TRACK_TRACE")
  // console.log(flows)

  const flow = await client.flow.list()
  console.log(flow)
}

// publicExample()
authorizedExample()
