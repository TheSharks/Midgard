
(async () => {
  require('dotenv').config()
  const Client = require('./src/classes/Client')

  const client = await Client.build(process.env.AMQP_URI, process.env.AMQP_QUEUE || 'wildbeast')
  client.on('ready', () => {
    console.log('Client is ready')
  })
  client.on('guildCreate', (guild) => {
    console.log('guild create from init', guild.iconURL)
  })
  client.on('messageCreate', m => {
    console.log('message create', m)
  })
})()
