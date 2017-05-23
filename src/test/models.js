import {crudTest} from './'

describe('Models', function () {
  crudTest({
    model: 'models',
    url: '/api/models?page=1',
    postUrl: '/api/models/',
    postAttributes: {
      name: 'name',
      attribute: 1
    },
    putAttributes: {
      name: 'updatedName',
      attribute: 2
    },
    expectedResponse: 'models',
    extProperties: ['created_at']
  })
})
