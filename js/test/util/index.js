const conf = require('../config')
const pkg = require('../../package')
const ow = pkg(conf.acc.normal.key)

module.exports = { pkg, ow }
