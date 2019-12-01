const { EventEmitter } = require('events')
const Guild = require('./types/Guild')
const Message = require('./types/Message')

module.exports = class MessageProcessor extends EventEmitter {
  constructor (client) {
    super()
    this._client = client
  }

  handle (msg) {
    // console.log(msg.t)
    switch (msg.t) {
      case 'GUILD_CREATE': {
        this._client.emit('guildCreate', new Guild(msg.d))
        break
      }
      case 'MESSAGE_CREATE': {
        this._client.emit('messageCreate', new Message(msg.d))
        break
      }
    }
  }
}
