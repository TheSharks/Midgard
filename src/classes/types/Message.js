const Base = require('./Base')
const User = require('./User')
const Member = require('./Member')

module.exports = class Message extends Base {
  constructor (packet, client) {
    super(packet.id)
    this.type = packet.type || 0
    this.timestamp = Date.parse(packet.timestamp)
    this.channel = {
      id: packet.channel_id,
      guild: {
        id: packet.guild_id
      }
    }
    this.attachments = packet.attachments
    this.embeds = packet.embeds
    this.member = packet.member
    this.mentions = packet.mentions
    this.timestamp = packet.timestamp
    this.content = packet.content || ''
    if (packet.author) {
      this.author = new User(packet.author, client)
    }
    if (packet.member) {
      packet.member.id = packet.author.id
      this.member = new Member(packet.member, client)
    }
  }
}
