import kue from 'kue'
import config from '../config'

export default kue.createQueue({
  redis: {
    host: config.redisHost,
    port: config.redisPort,
  },
})
