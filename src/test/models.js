import {crudTest} from './'

describe('Models', function () {
  crudTest({
    model: 'models',
    url: '/api/models/',
    postAttributes: {
      name: 'name',
      attribute: 1
    },
    putAttributes: {
      name: 'updatedName',
      attribute: 2
    },
    extProperties: ['current_day']
  })
})
