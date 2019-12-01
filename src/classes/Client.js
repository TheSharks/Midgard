const amqp = require('amqplib')
const { EventEmitter } = require('events')
const MessageProcessor = require('./MessageProcessor')

module.exports = class Client extends EventEmitter {
  constructor (connection, channel, queue) {
    super(MessageProcessor)
    this._conn = connection
    this._chann = channel
    this._queue = queue
    this._messageProcessor = new MessageProcessor(this)
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

  static async build (uri, queue) {
    const connection = await amqp.connect(undefined)
    const channel = await connection.createChannel()
    channel.assertQueue(queue, {
      durable: true
    })
    return new this(connection, channel, queue)
  }

  get isAlive () {
    return async () => {
      this._chann.sendToQueue(this._queue, Buffer.from('hi'), {
        persistent: true
      })
      return true
    }
  }
}
