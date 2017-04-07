import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import getRouter from './routes'
import {Server} from 'http'
import chalk from 'chalk'
import winston from 'winston-color'
import pkg from '../package.json'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  packageName: pkg.name,
}

const router = getRouter(options)
const { app, environment, port, logger, packageName} = options

if (environment !== 'test') {
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

const server = Server(app).listen(port, () => {
  logger.info(`${chalk.bgBlack.cyan(packageName)} listening on port ${port}...`)
})

export default server
