(function() {
    let f = async function(databaseName, collectionName, id) {
        let db = await require("./db.js")(databaseName)
        try {
	    let collection = await db.collection(collectionName)
            let ObjectId = require("mongoose").Types.ObjectId
            if (ObjectId.isValid(id)) {
                let oid = new ObjectId(id)
                let obj = await collection.findOne({ _id: oid})
                return obj
            } else {
                let obj = await collection.findOne({ name: id})
                return obj
            }
        } finally {
            await db.close()
        }
    }
    module.exports = f
})()
