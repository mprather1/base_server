import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import getRouter from './routes'
import {Server} from 'http'
import chalk from 'chalk'
import winston from 'winston-color'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston
}

const { app, environment, port, logger } = options

if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const router = getRouter(options)

app.use('/api', router)

const server = Server(app).listen(port, () => {
  logger.info(chalk.bgBlack.magenta('Listening on port', port + '...'))
})

export default server
