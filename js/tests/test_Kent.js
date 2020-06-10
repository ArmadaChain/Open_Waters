// Simple account creation, topic creation and post memo to topic for Hedera Hashgraph mainnet using Open Waters by Armada Chain Inc. 
// This script first creates a Hedera Hashgraph account. Information gathered is set to anonymous, but used to personalize account on Armada Platform. 
// Next it will generate a Hedera Consensus Service topic, and prompt for a message sent to the topic. 
// This message will be posted on the Hedera Hashgraph mainnet, and can be found using a Hedera Hashgraph explorer
// Message can also be found using the Open Waters API on the Armada Platform. 

// To send messages to 

// ------- Script Begin ----------
const openWater = require('../package/index') // requirements

var privateKey
var memo


const createAccount = async () => {
  // Init an open water client without api key
  console.log("Creating Hedera Hashgraph account!")
  const client = openWater()
  // The return client exports only one function "account.create"
  const account = await client.account.create('anon', 'na', 'anon', 'simpleAPI')
  console.log("Created!")
  // Record api key for Open Waters
  privateKey = account.privateKey 

  const data = await client.account.myAccount()
  const HH_ID = data.hederaAccountId

  console.log("This is your Hedera Hashgraph account ID" + HH_ID)
  console.log("Use this to check your message on Hedera Hashgraph")
  console.log("This is your privateKey: " + privateKey)
  console.log("You can insert this in script to send messages without creating new topics")
}

const topicMessageSend= async () => {
  // Init an open water client with api key created from account. If running 
  const client = openWater(privateKey)

  console.log("Creating HCS Topic!")
  // Create Hedera Consensus Topic, known as Flows on Armada Platform
  const flow = await client.flow.create("anonTopic", "TRACK_TRACE")

  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // Prompt for message to be sent to topic
  rl.question('What is the message you want to send?', (memo) => {
    // Send message to topic
    pushData = await data.push(flow.id, plainData, memo, false)
    rl.close()
  })
  
  // Get account ID 
  const data = await client.account.myAccount()
  const HH_ID = data.hederaAccountId
  console.log("Find your message from your HH account: " + HH_ID)
}


//Run Scripts
createAccount() // comment out to just send messages from same account
topicMessageSend()