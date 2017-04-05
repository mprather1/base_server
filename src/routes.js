import express from 'express'
import {models} from './queries'

export default function getRouter (options) {
  const router = express.Router()
  
  router.route('/models')
    .get(function (req, res, next) {
      models.getAllModels(req, res, next, options)
    })
    .post(function (req, res, next) {
      models.createModel(req, res, next, options)
    })
  
  router.route('/models/:id')
    .get(function (req, res, next) {
      models.getSingleModel(req, res, next, options)
    })
    .put(function (req, res, next) {
      models.updateSingleModel(req, res, next,  options)
    })
    .delete(function (req, res, next) {
      models.removeModel(req, res, next, options)
    })
 
 return router 
}
