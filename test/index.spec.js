const crud = require("../src/index");
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
