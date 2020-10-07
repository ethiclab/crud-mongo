# crud-mongo

    npm install @ethiclab/crud-mongo

# usage

A simple example, with no actual express router, only for testing purposes.

```javascript
const crud = require("@ethiclab/crud-mongo");
(async () => {
  const controller = await crud({
    mongoUrl: 'mongodb://localhost',
    databaseName: 'sys',
    root: '/',
    router: {
      get: () => {
        return {}
      },
      post: () => {
        return {}
      },
      put: () => {
        return {}
      },
      delete: () => {
        return {}
      }
    },
    col: 'mycollection'
  })
  const x = await controller.create({
    name: 'test object'
  })
  console.log(x)
})()
```

An example using express router.

```javascript
const express = require('express')
const app = express()
const router = express.Router()

crud({
    mongoUrl: 'mongodb://localhost',
    databaseName: 'sys',
    root: '/',
    router: router,
    col: 'mycollection'
})

app.use((req, res, next) => {
  router(req, res, next)
})

app.listen(12345)
```

Then, you can visit:

http://localhost:12345/mycollection

You can also use, for instance, Postman, for creating, updating and deleting records.

The following endpoints are defined:

    GET /mycollection
    POST /mycollection
    GET /mycollection/:id
    PUT /mycollection/:id
    DELETE /mycollection/:id

# where are the schemas?

This is a low level library for storing arbitrary documents with arbitrary properties
in order to support new properties, therefore, we decided not to add schema support
at this level.

# test

    docker run --name localmongo --rm -d -p 27017:27017 mongo
    npm test
