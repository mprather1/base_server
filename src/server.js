import 'babel-polyfill'
import config from './_config'
import express from 'express'
import bodyParser from 'body-parser'
import httpervert from 'httpervert'
import init from 'shintech-init-db'
import helmet from 'helmet'
import path from 'path'
import morgan from 'morgan'
import winston from 'winston-color'
import getRouter from './routes'
import pkg from '../package.json'

const _parentDir = path.dirname(__dirname) // eslint-disable-line

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  packageName: pkg.name,
  config: config
}

options.db = init(options)

const { app, environment } = options

app.use(helmet())

const server = httpervert(options)
const router = getRouter(options)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (environment !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api', router)

const serverConfig = {
  server: server,
  options: options
}

export default serverConfig
