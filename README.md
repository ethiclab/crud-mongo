# crud-mongo

    npm install @ethiclab/crud-mongo

# usage

```javascript
const crud = require("@ethiclab/crud-mongo");
(async () => {
  const db = await require("@ethiclab/crud-mongo/src/db")("mongodb://localhost", 'test')
  crud()
})()
```
