require('./promisify')
process.env.NODE_PATH = __dirname + '/lib/'
require('module').Module._initPaths()

require('babel-polyfill')
require('./lib/worker')
