# Open Waters

Open Waters is the simplest method to add Hedera Hashgraph to your supply chain or software. Using the [Armada Platform](https://armadachain.io), Open Waters offers straight forward interactions with Hedera Hashgraph including account creation, and sending data. Open Waters can also be used to access the benefits of the Armada Platform for data organization, conditional flows and managing supply chain interactions.

## How to use

```javascript
const ow = require('open-waters')

// Init an open water client without api key
let client = ow()

// The return client exports only one function "account.create"
const account = await client.account.create('username', 'email@a.a','name', 'company')

// Re-init an open water client with api key created from account
client = ow(account.privateKey)

// Now you can access full functions
```

## Functions:

1. Account
    - ow.account.create
    - ow.account.get
    - ow.account.myAccount
    - ow.account.remove
    - ow.account.update

2. Data
    - ow.data.get
    - ow.data.push

3. Dataset
    - ow.dataset.create
    - ow.dataset.get
    - ow.dataset.list
    - ow.dataset.remove
    - ow.dataset.update

4. Document
    - ow.document.upload

5. Flow
    - ow.flow.create
    - ow.flow.get
    - ow.flow.list
    - ow.flow.remove
    - ow.flow.update

6. Step
    - ow.step.create
    - ow.step.get
    - ow.step.listByFlow
    - ow.step.remove
    - ow.step.update
    - ow.step.validate

7. Metric
    - ow.metric.countCalls
    - ow.metric.countFlows
    - ow.metric.countTransactions
    - ow.metric.lastCall

## Working with the Armada Platform

If interested in using the Armada Platform in your supply chain or company, contact us at contact@armadachain.io.

## License

See LICENSE for details. Armada Chain Inc 2020


