(function() {
  let f = async function(db, collectionName) {
    let collection = await db.collection(collectionName)
    return await collection.countDocuments({})
  }
  module.exports = f
})()
