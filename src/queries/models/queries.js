import {init as db} from '../'

function getAllModels (req, res, next, options) {
  db.any('select * from models')
  .then(function (data) {
    res.status(200)
    .json(data)
  })
  .catch(function (err) {
    return next(err)
  })
}

function createModel (req, res, next, options) {
  db.none('insert into models( name, attribute )' + 'values( ${name}, ${attribute} )', req.body) // eslint-disable-line
  .then(function () {
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one model...'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function getSingleModel (req, res, next, options) {
  const modelID = parseInt(req.params.id)
  db.one('select * from models where id = $1', modelID)
  .then(function (data) {
    res.status(200)
    .json(data)
  })
  .catch(function (err) {
    return next(err)
  })
}

function updateSingleModel (req, res, next, options) {
  const modelID = parseInt(req.params.id)
  db.none('update models set name=$1, attribute=$2 where id=$3', [req.body.name, req.body.attribute, modelID])
  .then(function (done) {
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated one model...'
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

function removeModel (req, res, next, options) {
  var modelID = parseInt(req.params.id)
  db.result('delete from models where id = $1', modelID)
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${data.rowCount} model`
    })
  })
  .catch(function (err) {
    return next(err)
  })
}

export default {
  getAllModels,
  createModel,
  getSingleModel,
  updateSingleModel,
  removeModel
}
