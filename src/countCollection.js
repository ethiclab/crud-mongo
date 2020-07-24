(function() {
    let f = async function(databaseName, collectionName) {
        let db = await require("./db.js")(databaseName)
        try {
            let collection = await db.collection(collectionName)
            return await collection.countDocuments({})
        } finally {
            db.close()
        }
    }
    module.exports = f
})()
