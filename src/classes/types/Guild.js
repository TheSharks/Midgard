const { CDN_URL } = require('../rest/EndpointConstants')
const Base = require('./Base')

module.exports = class Guild extends Base {
  constructor (packet) {
    super(packet.id)
    this.update(packet)
  }

  update (data) {
    if (data.name !== undefined) {
      this.name = data.name
    }
    if (data.verification_level !== undefined) {
      this.verificationLevel = data.verification_level
    }
    if (data.splash !== undefined) {
      this.splash = data.splash
    }
    if (data.banner !== undefined) {
      this.banner = data.banner
    }
    if (data.region !== undefined) {
      this.region = data.region
    }
    if (data.owner_id !== undefined) {
      this.ownerID = data.owner_id
    }
    if (data.icon !== undefined) {
      this.icon = data.icon
    }
    if (data.features !== undefined) {
      this.features = data.features
    }
    if (data.emojis !== undefined) {
      this.emojis = data.emojis
    }
    if (data.afk_channel_id !== undefined) {
      this.afkChannelID = data.afk_channel_id
    }
    if (data.afk_timeout !== undefined) {
      this.afkTimeout = data.afk_timeout
    }
    if (data.default_message_notifications !== undefined) {
      this.defaultNotifications = data.default_message_notifications
    }
    if (data.mfa_level !== undefined) {
      this.mfaLevel = data.mfa_level
    }
    if (data.large !== undefined) {
      this.large = data.large
    }
    if (data.max_presences !== undefined) {
      this.maxPresences = data.max_presences
    }
    if (data.explicit_content_filter !== undefined) {
      this.explicitContentFilter = data.explicit_content_filter
    }
    if (data.system_channel_id !== undefined) {
      this.systemChannelID = data.system_channel_id
    }
    if (data.premium_tier !== undefined) {
      this.premiumTier = data.premium_tier
    }
    if (data.premium_subscription_count !== undefined) {
      this.premiumSubscriptionCount = data.premium_subscription_count
    }
    if (data.vanity_url_code !== undefined) {
      this.vanityURL = data.vanity_url_code
    }
    if (data.preferred_locale !== undefined) {
      this.preferredLocale = data.preferred_locale
    }
    if (data.description !== undefined) {
      this.description = data.description
    }
    if (data.max_members !== undefined) {
      this.maxMembers = data.max_members
    }
  }

  get iconURL () { // just this one for now.
    return this.icon ? `${CDN_URL}/icons/${this.id}/${this.icon}.${this.icon.startsWith('a_') ? 'gif' : 'png'}?size=256` : null
  }
}
