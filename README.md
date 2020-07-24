# crud-mongo

    npm install @ethiclab/crud-mongo

# usage

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
    col: 'menus'
  })
  const x = await controller.create({})
  console.log(x)
})()
```

# test

    docker run --name localmongo --rm -d -p 27017:27017 mongo
    npm test
