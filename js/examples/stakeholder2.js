//stakeholder 2

// ------- Script Begin ----------
const openWater = require('../package') // requirements

let privateKey = ""

const createAccount = async () => {
  // Init an open water client without api key
  console.log("Creating Hedera Hashgraph account!")
  let client = openWater()
  // The return client exports only one function "account.create"
  // You can change your account info on Armada Platform, set for anonymous for now
  const username = `anontest${Math.random()}`
  const email = `anon@email${Math.random()}`
  const account = await client.account.create(username, email, 'name', 'Company B')
  console.log("Created!")
  // Record api key for Open Waters
  privateKey = account.privateKey

  // Re-init an open water client with api key created from account
  client = openWater(privateKey)

  const data = await client.account.myAccount()
  HH_ID = data.hederaAccountId

  console.log("This is your Hedera Hashgraph account ID: " + HH_ID)
  console.log("Use this to check your message on Hedera Hashgraph")
  console.log("This is your privateKey: " + privateKey)
  console.log("You can insert this in script to send messages without creating new topics")
}