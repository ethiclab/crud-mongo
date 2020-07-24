(function() {
    let f = async function(databaseName, collectionName, id) {
        let ObjectId = require("mongoose").Types.ObjectId
        let db = await require("./db.js")(databaseName)
        try {
            let collection = await db.collection(collectionName)
            if (id) {
                let oid = new ObjectId(id)
                await collection.deleteOne({ _id: oid })
            } else {
                collection.drop().then(() => {}).catch(() => {})
            }
            return null
        } finally {
            await db.close()
        }
    }
    module.exports = f
})()
