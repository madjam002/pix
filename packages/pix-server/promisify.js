const bluebird = require('bluebird')

bluebird.promisifyAll(require('kue').Job.prototype)
