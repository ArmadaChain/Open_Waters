// STILL NOT COMPLETED YET. PLEASE DON'T RUN

/**
 * Global variables
 */
const ow = require('../package')
let client = ow()
let acc1, acc2, acc3, flow, dataSet, step1, step2, step3

/**
 * 0 - Prepare necessary things
 */
function prepare() {

}

/**
 * Creating 3 accounts on Armada
 */
async function createAccounts() {
  try {
    acc1 = await client.account.create('account-1', 'account1@example.com')
    acc2 = await client.account.create('account-2', 'account2@example.com')
    acc3 = await client.account.create('account-3', 'account3@example.com')
  } catch (error) {
    // Just skip if already created
    // It is because of running this example multiple times
  }
}

/**
 * Create flow
 */
async function createFlow() {
  try {
    flow = await client.flow.create(
      'TestFlow',
      'TRACK_TRACE',
      null,
      [acc2.id, acc3.id] // Add account-2 and account-3 as partners
    )
  } catch (error) {
    // Just skip if already created
    // It is because of running this example multiple times
  }
}

/**
 * Create step 1 ("Manufacturing Step")
 * First step will have Account 2 as validator.
 * And will upload document called invoice_test.pdf
 */
async function createStep1() {
  try {
    doc = await client.document.upload('invoice_test.pdf')
    step1 = await client.step.create(1, acc2.id, flow.id, [doc.id])
  } catch (error) {
    // Just skip if already created
    // It is because of running this example multiple times
  }
}

/**
 * Create step 2 ("Logistics Step")
 * Sceond step will have Account 3 as validator.
 * They will take a data set of 10 boxes
 */
async function createStep2() {
  try {
    dataSet = await client.dataset.create({'numberOfItem': 'number'}, 'box')
    step2 = await client.step.create(2, acc3.id, flow.id, null, dataSet.id, {numberOfItem: 10})
  } catch (error) {
    // Just skip if already created
    // It is because of running this example multiple times
  }
}

/**
 * Create step 3 ("Receiving Step")
 * Sceond step will have Account 1 as validator.
 * This will take a data set of 10 boxes
 */
async function createStep3() {
  try {
    step3 = await client.step.create(3, acc1.id, flow.id, null, dataSet.id, {numberOfItem: 10})
  } catch (error) {
    // Just skip if already created
    // It is because of running this example multiple times
  }
}

async function autoValidateNextStep() {
  
}

/**
 * main
 */
async function main() {
  await prepare()
  await createAccounts()
  await createFlow()
  await createStep1()
  await createStep2()
  await createStep3()
  await autoValidateNextStep()
}

main()