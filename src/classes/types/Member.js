const User = require('./User')

module.exports = class Member extends User {
  constructor (packet, client) {
    super(packet, client)
    this.deaf = packet.deaf
    this.hoistedRole = packet.hoisted_role
    this.mute = packet.mute
    this.joinedAt = new Date(packet.joined_at).getTime()
    this.nick = packet.nick
    this.roles = packet.roles
  }
}
