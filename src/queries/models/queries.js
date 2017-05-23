const queries = {}

export default function getAllRoutes (options) {
  const {db} = options

  queries.getAllModels = (req, res, next) => {
    db.any('select * from models')
    .then(function (data) {
      res.status(200)
      .json(data)
    })
    .catch(function (err) {
      return next(err)
    })
  }

  queries.createModel = (req, res, next) => {
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

  queries.getSingleModel = (req, res, next) => {
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

  queries.updateSingleModel = (req, res, next) => {
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

  queries.removeModel = (req, res, next) => {
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

  return queries
}
