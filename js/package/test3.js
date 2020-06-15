const openWater = require('./index')

const publicExample = async () => {
  // Init an open water client without apikey
  const client = openWater()

  // The return client exports only one function "account.create"
  const account = await client.account.create('kentm', 'bwonymph@gmail.com', 'Kent Makishima', 'ArmadaChain')
  console.log(account.privateKey)
}

const authorizedExample = async () => {
  // Init an open water client with an apikey
  const client = openWater('UKMYO1DFLNFZSri9LVuh')

  // The retun client exports all functions
  // For example, get all flows
  // const flows = await client.flow.create("testFlow", "TRACK_TRACE")
  // console.log(flows)

  const flow = await client.flow.list()
  console.log(flow)
}

const update1 = async () => {
  // Init an open water client with an apikey
  const client = openWater('UKMYO1DFLNFZSri9LVuh')

  const test = await client.flow.update("FL0000001", "Changed Name")

  // const flow = await client.flow.list()
  // console.log(flow)
}

const create = async () => {
  const client = openWater('UKMYO1DFLNFZSri9LVuh')


  const flows = await client.flow.create("testFlow2", "TRACK_TRACE")

  const flow = await client.flow.list()
  console.log(flow)
}

const remove1 = async () => {
  const client = openWater('UKMYO1DFLNFZSri9LVuh')

  const test = await client.flow.remove("FL0000002")
}

// publicExample()
 // authorizedExample()
// update1()
// create()
remove1()