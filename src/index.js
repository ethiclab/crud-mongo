'use strict';
(function() {
let f = (beforeCreation, router, root, db, col, addCustomInfo) => {
    console.log(`registering crud endpoint at path ${root} on database ${db} for collection ${col}`)
    const readCollection = require('./readCollection.js')
    const countCollection = require('./countCollection.js')
    const insertIntoCollection = require('./insertIntoCollection.js')
    const selectFromCollection = require('./selectFromCollection.js')
    const replaceInCollection = require('./replaceInCollection.js')
    const deleteFromCollection = require('./deleteFromCollection.js')

    let create = async (c, o) => insertIntoCollection(beforeCreation, db, c, o)
    let replyCreated = (a, path, y) => {
	if (y.error) {
            a.status(500).send(y)
	} else {
            a.status(201).location(`${path}/${y._id}`).send(y)
        }
    }

    let get = async (c, id) => selectFromCollection(db, c, id)
    let replyGot = (a, y) => a.status(200).send(y)

    let replace = async (c, id, o) => replaceInCollection(db, c, id, o)
    let replyReplaced = (a, y) => a.status(200).send(y)

    let remove = async (c, id) => deleteFromCollection(db, c, id)
    let replyRemoved = (a, y) => a.status(200).send(y)

    let ctrl = {
        create: obj => insertIntoCollection(null, db, col, obj),
        drop: () => deleteFromCollection(db, col),
        read: () => readCollection(db, col, addCustomInfo),
        count: () => countCollection(db, col)
    }

    if (router && root) {
        router.get   (`${root}${col}`    , (q, a) => readCollection(db, col, addCustomInfo).then(y => a.send(y)))
        router.post  (`${root}${col}`    , (q, a) => create (`${col}`, q.body             ).then(y => replyCreated(a, q.path, y)))
        router.get   (`${root}${col}/:id`, (q, a) => get    (`${col}`, q.params.id        ).then(y => replyGot(a, y)))
        router.put   (`${root}${col}/:id`, (q, a) => replace(`${col}`, q.params.id, q.body).then(y => replyReplaced(a, y)))
        router.delete(`${root}${col}/:id`, (q, a) => remove (`${col}`, q.params.id        ).then(y => replyRemoved(a, y)))
    }

    return ctrl
}
module.exports = f
})()
