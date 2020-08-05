(function() {
  let f = async function(db, collectionName, id) {
    let ObjectId = require("mongoose").Types.ObjectId
    let collection = await db.collection(collectionName)
    if (id) {
      let oid = new ObjectId(id)
      await collection.deleteOne({ _id: oid })
    } else {
      await collection.drop()
    }
    return null
  }
  module.exports = f
})()
