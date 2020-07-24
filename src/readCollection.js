(function() {
    
    let f = async function(databaseName, collectionName, addCustomInfo) {
        let db = await require("./db.js")(databaseName)
        try {
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
        } finally {
            db.close()
        }
    }
    module.exports = f
})()
