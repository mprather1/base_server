import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import router from './routes'
import {Server} from 'http'
import chalk from 'chalk'
import logger from 'winston-color'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development'
}

const { app, environment, port } = options

if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

const server = Server(app).listen(port, () => {
  logger.info(chalk.cyan('listening on', port))
})

export default server
