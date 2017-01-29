import redis from 'redis'
import lock from 'redislock'
import config from '../config'

const client = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
})

export async function getLock() {
  return lock.createLock(client, {
    timeout: 10000,
    retries: 20,
    delay: 100,
  })
}
