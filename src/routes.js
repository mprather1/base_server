import express from 'express'
import {models} from './queries'

export default function getRouter (options) {
  const router = express.Router()
  
  router.route('/models')
    .get(function (req, res) {
      models.getAllModels(req, res, null, options)
    })
    .post(function (req, res) {
      models.createModel(req, res, null, options)
    })
  
  router.route('/models/:id')
    .get(function (req, res) {
      models.getSingleModel(req, res, null, options)
    })
    .put(function (req, res) {
      models.updateSingleModel(req, res, null,  options)
    })
    .delete(function (req, res) {
      models.removeModel(req, res, null, options)
    })
 
 return router 
}
