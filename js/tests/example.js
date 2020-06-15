// Simple account creation, topic creation and post memo to topic for Hedera Hashgraph mainnet using Open Waters by Armada Chain Inc. 
// This script first creates a Hedera Hashgraph account. Information gathered is set to anonymous, but used to personalize account on Armada Platform. 
// Next it will generate a Hedera Consensus Service topic, and prompt for a message sent to the topic. 
// This message will be posted on the Hedera Hashgraph mainnet, and can be found using a Hedera Hashgraph explorer
// Message can also be found using the Open Waters API on the Armada Platform. 

// To send messages to 

// ------- Script Begin ----------
const openWater = require('../package') // requirements

let privateKey = ""

const createAccount = async () => {
  // Init an open water client without api key
  console.log("Creating Hedera Hashgraph account!")
  let client = openWater()
  // The return client exports only one function "account.create"
  // You can change your account info on Armada Platform, set for anonymous for now
  const username = `anon${Math.random()}`
  const email = `anon@email${Math.random()}`
  const account = await client.account.create(username, email, 'name', 'a company')
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

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const ask = (question) => new Promise((res, rej) => {
  rl.question(question, (input) => res(input))
})

const topicMessageSend= async () => {
  // Init an open water client with api key created from account. If running 
  const client = openWater(privateKey)

  console.log("Creating HCS Topic!")
  // Create Hedera Consensus Topic, known as Flows on Armada Platform
  const flow = await client.flow.create(`anonTopic-${Math.random()}`, "TRACK_TRACE")

  // Prompt for message to be sent to topic
  const memo = await ask('What is the message you want to send? ')
  rl.close()
  console.log('Got your message. Sending to HH...')
  await client.data.push(flow.id, memo, memo, false)
  
  // Get message from HH account 
  // console.log("Find your message from your HH account")
  // const data = await client.data.get(flow.id)
  // console.log("Here is your message", data)
}

const run = async () => {
  //Run Scripts
  await createAccount()
  await topicMessageSend()
}

run().then(() => console.log('Finish!'))
