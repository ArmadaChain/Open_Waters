/**
 * Global variables
 */
const ow = require('../package')
let client = ow()
let acc1, acc2, acc3, flow, dataSet, step1, step2, step3


/**
 * WARNING!!! IF YOU ARE RUNNING FILE IN THE SECOND TIME!!!
 * BECAUSE YOU MAY RUN FILE THIS MANY TIMES, SO THE ACCOUNTS ARE CREATED ON THE FIRST TIME
 * TO PREVENT DUPLICATED ACCOUNTS, IT'S IMPORTANT TO UPDATE PRIVATE KEY OF 3 ACCOUNTS BELOW 
 * FOR THE FIRST TIME, DON'T NEED TO UPDATE
 */
let privateKey_acc1 = ''
let privateKey_acc2 = ''
let privateKey_acc3 = ''


async function createAccount1() {
  try {
    console.log('Creating account-1...')
    acc1 = await client.account.create('account-1', 'account1@example.com')
  } catch (error) {
    console.log(`Account already existed, fetching it...`)
    // Getting it from privateKey_acc1
    client = ow(privateKey_acc1)
    acc1 = await client.account.myAccount()
  } finally {
    console.log('account-1 is created')
    console.log(acc1)
  }
}

async function createAccount2() {
  try {
    console.log('Creating account-2...')
    acc2 = await client.account.create('account-2', 'account2@example.com')
  } catch (error) {
    console.log(`Account already existed, fetching it...`)
    // Getting it from privateKey_acc2
    client = ow(privateKey_acc2)
    acc2 = await client.account.myAccount()
  } finally {
    console.log('account-2 is created')
    console.log(acc2)
  }
}

async function createAccount3() {
  try {
    console.log('Creating account-3...')
    acc3 = await client.account.create('account-3', 'account3@example.com')
  } catch (error) {
    console.log(`Account already existed, fetching it...`)
    // Getting it from privateKey_acc3
    client = ow(privateKey_acc3)
    acc3 = await client.account.myAccount()
  } finally {
    console.log('account-3 is created')
    console.log(acc3)
  }
}

/**
 * Creating 3 accounts on Armada
 */
async function createAccounts() {
  await createAccount1()
  await createAccount2()
  await createAccount3()
  client = ow(acc1.privateKey)
}

/**
 * Create flow
 */
async function createFlow() {
  try {
    console.log('Creating flow...')
    flow = await client.flow.create(
      'TestFlow-' + Math.random(),
      'TRACK_TRACE',
      null,
      [acc2.id, acc3.id] // Add account-2 and account-3 as partners
    )
    console.log('Flow is created: ')
    console.log(flow)
  } catch (error) {
    console.error('Create flow error', error)
  }
}

/**
 * Create step 1 ("Manufacturing Step")
 * First step will have Account 2 as validator.
 * And will upload document called invoice_test.pdf
 */
async function createStep1() {
  try {
    console.log('Creating step 1...')
    const path = require('path')
    doc = await client.document.upload(path.resolve('invoice_test.pdf'))
    step1 = await client.step.create(1, acc2.id, flow.id, [doc.id])
    console.log('Step 1 is created: ')
    console.log(step1)
  } catch (error) {
    console.error('Create step error', error)
  }
}

/**
 * Create step 2 ("Logistics Step")
 * Sceond step will have Account 3 as validator.
 * They will take a data set of 10 boxes
 */
async function createStep2() {
  try {
    console.log('Creating step 2...')
    dataSet = await client.dataset.create({ 'numberOfItem': 'number' }, 'box-' + Math.random())
    step2 = await client.step.create(2, acc3.id, flow.id, null, dataSet.id, { numberOfItem: 10 })
    console.log('Step 2 is created')
    console.log(step2)
  } catch (error) {
    console.error('Create step error', error)
  }
}

/**
 * Create step 3 ("Receiving Step")
 * Sceond step will have Account 1 as validator.
 * This will take a data set of 10 boxes
 */
async function createStep3() {
  try {
    console.log('Creating step 3...')
    step3 = await client.step.create(3, acc1.id, flow.id, null, dataSet.id, { numberOfItem: 10 })
    console.log('Step 3 is created')
    console.log(step3)
  } catch (error) {
    console.error('Create step error', error)
  }
}

function pause() {
  return new Promise(resolve => {
    console.log('Press any key to continue')

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', () => resolve())
  })

}

async function autoValidateNextStep() {
  try {
    console.log('Validate step 1...')
    await client.step.validate(step1.id, true)
    console.log('Now please check the message on Hedera to see that it already notified validator next step (step 2)')

    await pause()

    console.log('Validate step 2...')
    await client.step.validate(step2.id, true)
    console.log('Now please check the message on Hedera to see that it already notified validator next step (step 3)')

    await pause()

    console.log('Validate step 3...')
    await client.step.validate(step3.id, true)
    console.log('Now please check the message on Hedera to see that it already notified that flow is completed')

    console.log('Finished!')
    await pause()
    process.exit(0)

  } catch (error) {
    console.log(error)
  }
}

/**
 * main
 */
async function main() {
  await createAccounts()
  await createFlow()
  await createStep1()
  await createStep2()
  await createStep3()
  await autoValidateNextStep()
}

main()