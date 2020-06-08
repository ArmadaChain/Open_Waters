const path = require('path')
const log4js = require('log4js')
const config = require('./test/config')

const filename = path.join(config.log.dir, config.log.filename)

log4js.addLayout('custom', () => {
  return (event) => {
    let message = `${event.level.levelStr} ${event.startTime.toLocaleString()}`
    event.data.forEach((v) => {
      if (v instanceof Error) {
        message += `\n\t${v.stack}`
      } else if (v instanceof Object) {
        message += `\n\t${JSON.stringify(v)}`
      } else {
        message += `\n\t${v}`
      }
    })
    return message
  }
})

log4js.configure({
  appenders: {
    disk: { type: 'file', filename: filename, maxLogSize: config.log.size, layout: { type: 'custom' } },
    out: { type: 'console', layout: { type: 'custom' } }
  },
  categories: {
    default: { appenders: ['disk', 'out'], level: config.log.level }
  }
})
const logger = log4js.getLogger()

module.exports = logger
