(function() {
  let f = async function(beforeCreation, db, collectionName, obj) {
    try {
      let collection = await db.collection(collectionName)
      if (beforeCreation) {
        await beforeCreation(collection, obj)
      }
      let result = await collection.insertOne(obj, {w:1})
      return await collection.findOne({ _id: result.insertedId})
    } catch (e) {
      console.error(e)
      return {
        error: e.message
      }
    }
  }
  module.exports = f
})()
