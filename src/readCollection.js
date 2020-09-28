(function() {
  let f = async function(db, collectionName) {
    return await db.collection(collectionName).find({}).toArray()
  }
  module.exports = f
})()
