import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import getRouter from './routes'
import getSocketClient from './getSocketClient'
import {Server} from 'http'
import chalk from 'chalk'
import winston from 'winston-color'
import pkg from '../package.json'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  socketPort: process.env.SOCKET_PORT,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  hostname: process.env.HOSTNAME,
  packageName: pkg.name
}

const { app, environment, port, logger, packageName } = options

if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const socketClient = getSocketClient(options)
const router = getRouter(options)

app.use('/api', router)

const server = Server(app).listen(port, () => {
  logger.info(`${chalk.bgBlack.cyan(packageName)} listening on port ${port}...`)
})

export default server
