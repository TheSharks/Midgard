// This file is just for tesing, and must be adapted for module use later.
(async () => {
  require('dotenv').config()
  const Client = require('./src/classes/Client')

  const client = await Client.build(process.env.DISCORD_TOKEN, process.env.AMQP_URI, process.env.AMQP_QUEUE || 'wildbeast')
  client.on('ready', () => {
    console.log('Client is ready')
  })
  client.on('guildCreate', (guild) => {
    console.log('guild create from init', guild.iconURL)
  })
  client.on('messageCreate', m => {
    if (m.channel.id === '265283332269408257' && !m.author.bot && m.content === 'hello') {
      client.createMessage(m.channel.id, {
        content: `Hello, ${m.author.username}#${m.author.discriminator}. You were created on ${new Date(m.author.createdAt).toISOString()} and joined this server ${new Date(m.member.joinedAt).toISOString()}`
      })
      console.log(m.member)
    }
  })
})()
