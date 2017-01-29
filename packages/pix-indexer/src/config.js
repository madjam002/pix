import invariant from 'invariant'

invariant(!!process.env.MONGO_URI, 'No MONGO_URI provided')
invariant(!!process.env.REDIS_HOST, 'No REDIS_HOST provided')
invariant(!!process.env.REDIS_PORT, 'No REDIS_PORT provided')
invariant(!!process.env.DATA_PATH, 'No DATA_PATH provided')
invariant(!!process.env.PIX_URL, 'No PIX_URL provided')

export default {
  mongoUri: process.env.MONGO_URI,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  dataPath: process.env.DATA_PATH,
  pixURL: process.env.PIX_URL,
}
