(function() {
    let f = async function(beforeCreation, databaseName, collectionName, obj) {
        let db = await require("./db.js")(databaseName)
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
	} finally {
            await db.close()
        }
    }
    module.exports = f
})()
