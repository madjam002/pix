const fs = require('fs')

const source = `window._config = ${JSON.stringify({
  'serverEndpoint': process.env.SERVER_ENDPOINT || '',
})};`

fs.writeFileSync(__dirname + '/bundle.config.js', source)

console.log('Config module written')
