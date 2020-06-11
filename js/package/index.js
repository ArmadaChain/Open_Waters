const account = require('./account')
const dataset = require('./dataset')
const document = require('./document')
const flow = require('./flow')
const step = require('./step')
const data = require('./data')
const metric = require('./metric')

module.exports = (apikey) => {
  if (apikey) {
    const client = require('./client').init(apikey)
    return {
      account: account(client),
      dataset: dataset(client),
      document: document(client),
      flow: flow(client),
      step: step(client),
      data: data(client),
      metric: metric(client),
    }
  } else {
    return {
      account: {
        create: account().create
      }
    }
  }
}
