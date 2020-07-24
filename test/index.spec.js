const crud = require("../src/index");
(async () => {
  crud({
    mongoUrl: 'mongodb://localhost',
    databaseName: 'test'
  })
})()
