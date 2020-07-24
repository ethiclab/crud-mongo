const crud = require("../src/index");
(async () => {
  const db = await require("../src/db")("mongodb://localhost", 'test')
  crud()
})()
