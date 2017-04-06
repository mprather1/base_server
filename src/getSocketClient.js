import net from 'net'
import DuplexEmitter from 'duplex-emitter'
import logger from 'winston-color'
import chalk from 'chalk'

export default function getSocketClient (options) {
  
  const {socketPort, hostname, packageName} = options
  
  const s = new net.Socket()
  
  const socket = s.connect(socketPort, hostname)
  
  const emitter = DuplexEmitter(socket)

  socket.on('connect', () => {
    emitter.emit('connected', packageName)
  })
  
  emitter.once('connected', (data) => {
    logger.info(`connected to ${chalk.bgBlack.green(data)}...`)
    socket.on('close', () => {
      handleClose(data, data)
    })    
  })
  
  function handleClose (name) {
    logger.info(`connection to ${chalk.bgBlack.green(name)} closed...`)
  }
  
  return emitter
}