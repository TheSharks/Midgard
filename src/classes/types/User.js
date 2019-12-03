const Base = require('./Base')
const { CDN_URL } = require('../rest/EndpointConstants')

module.exports = class User extends Base {
  constructor (packet, client) {
    super(packet.id)
    if (!client) {
      this._missingClientError = new Error('Missing client in constructor') // Preserve constructor callstack
    }
    this._client = client
    this.bot = !!packet.bot
    if (packet.avatar !== undefined) {
      this.avatar = packet.avatar
    }
    if (packet.username !== undefined) {
      this.username = packet.username
    }
    if (packet.discriminator !== undefined) {
      this.discriminator = packet.discriminator
    }
  }

  get mention () {
    return `<@${this.id}>`
  }

  get defaultAvatar () {
    return this.discriminator % 5
  }

  get defaultAvatarURL () {
    return `${CDN_URL}/embed/avatars/${this.defaultAvatar}.png`
  }

  get staticAvatarURL () {
    if (this._missingClientError) {
      throw this._missingClientError
    }
    return this.avatar ? `${CDN_URL}/avatars/${this.id}/${this.avatar}.png?size=256` : this.defaultAvatarURL
  }

  get avatarURL () {
    if (this._missingClientError) {
      throw this._missingClientError
    }
    return this.avatar ? `${CDN_URL}/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256` : this.defaultAvatarURL
  }

  dynamicAvatarURL (format, size) {
    if (!this.avatar) {
      return this.defaultAvatarURL
    }
    return `${CDN_URL}/avatars/${this.id}/${this.avatar}.${format}?size=${size}`
  }

  getDMChannel () {
    // return this._client.getDMChannel.call(this._client, this.id)
  }
}
