const amqp = require('amqplib')
const { EventEmitter } = require('events')
const MessageProcessor = require('./MessageProcessor')
const RequestHandler = require('./rest/RequestHandler')
const Endpoints = require('./rest/EndpointConstants')
const Message = require('./types/Message')

module.exports = class Client extends EventEmitter {
  constructor (token, connection, channel, queue) {
    super(MessageProcessor)
    this._token = token
    this._conn = connection
    this._chann = channel
    this._queue = queue
    this._messageProcessor = new MessageProcessor(this)
    this._requestHandler = new RequestHandler(this)
    this._chann.consume(this._queue, m => {
      let msg
      try {
        msg = JSON.parse(m.content.toString())
      } catch (_) {
        console.error('Invalid message received from RabbitMQ')
        return
      }
      this._messageProcessor.handle(msg)
      this._chann.ack(m)
    })
    super.emit('ready')
    process.on('exit', () => this._conn.close())
  }

  static async build (token, uri, queue) {
    const connection = await amqp.connect(undefined)
    const channel = await connection.createChannel()
    channel.assertQueue(queue, {
      durable: true
    })
    return new this(token, connection, channel, queue)
  }

  get isAlive () {
    return async () => {
      this._chann.sendToQueue(this._queue, Buffer.from('hi'), {
        persistent: true
      })
      return true
    }
  }

  createMessage (channelID, content, file) {
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content
        }
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content
      } else if (content.content === undefined && !content.embed && !file) {
        return Promise.reject(new Error('No content, file, or embed'))
      }
      if (content.content) {
        content.content = content.content.replace(/@everyone/g, '@\u200beveryone').replace(/@here/g, '@\u200bhere')
      }
    } else if (!file) {
      return Promise.reject(new Error('No content, file, or embed'))
    }
    return this._requestHandler.request('POST', Endpoints.CHANNEL_MESSAGES(channelID), true, content, file).then((message) => new Message(message, this))
  }
}
