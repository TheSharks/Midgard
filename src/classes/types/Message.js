const Base = require('./Base')

module.exports = class Message extends Base {
  constructor (packet) {
    super(packet.id)
    // These definitions are not in the update function
    // because they will never be updated
    this.type = packet.type || 0
    this.timestamp = Date.parse(packet.timestamp)
    this.channel = {
      id: packet.channel_id
    }
    this.content = ''
    if (packet.author) {
      // this.author = new User(packet)
    }
  }
}
