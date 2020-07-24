(function() {
  let f = async function(db, collectionName, addCustomInfo) {
    let collection = await db.collection(collectionName)
    return await new Promise(function(resolve, reject) {
      collection.find({}).toArray(function(err, docs) {  
        if (err) { return err }
        docs.forEach(async data => {
          if (typeof addCustomInfo === 'function') {
            await addCustomInfo(data)
          }
        })
        return resolve(docs)
      })
    })
  }
  module.exports = f
})()
