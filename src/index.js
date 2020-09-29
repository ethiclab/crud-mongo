'use strict';
(function() {
let f = async (cfg) => {
    console.log(`registering crud endpoint ${JSON.stringify(cfg, null, 4)}`)

    const beforeCreation = cfg.beforeCreation
    const router = cfg.router
    const root = cfg.root
    const mongoUrl = cfg.mongoUrl
    const databaseName = cfg.databaseName
    const col = cfg.col
    const addCustomInfo = cfg.addCustomInfo

    if (!router) {
      throw Error('router not set')
    }
    
    const readCollection = require('./readCollection.js')
    const countCollection = require('./countCollection.js')
    const insertIntoCollection = require('./insertIntoCollection.js')
    const selectFromCollection = require('./selectFromCollection.js')
    const replaceInCollection = require('./replaceInCollection.js')
    const deleteFromCollection = require('./deleteFromCollection.js')
    const connect = async () => await require('./db.js')(mongoUrl, databaseName)

    let create = async o => {
      const db = await connect()
      try {
        const retval = await insertIntoCollection(beforeCreation, db, col, o)
        return retval
      } finally {
        await db.close()
      }
    }

    let replyCreated = (a, path, y) => {
	if (y.error) {
            a.status(500).send(y)
	} else {
            a.status(201).location(`${path}/${y._id}`).send(y)
        }
    }

    let count = async () => {
      const db = await connect()
      try {
        const retval = await countCollection(db, col)
        return retval
      } finally {
        await db.close()
      }
    }

    let read = async () => {
      const db = await connect()
      try {
        const retval = await readCollection(db, col)
        return retval
      } finally {
        await db.close()
      }
    }

    let get = async (c, id) => {
      const db = await connect()
      try {
        const retval = await selectFromCollection(db, c, id)
        return retval
      } finally {
        await db.close()
      }
    }

    let replyGot = (a, y) => a.status(200).send(y)

    let replace = async (c, id, o) => replaceInCollection(db, c, id, o)
    let replyReplaced = (a, y) => a.status(200).send(y)

    let remove = async id => {
      const db = await connect()
      try {
        const retval = await deleteFromCollection(db, col, id)
        return retval
      } finally {
        await db.close()
      }
    }

    let replyRemoved = (a, y) => a.status(200).send(y)

    let ctrl = {
        create: create,
        drop: remove,
        remove: remove,
        read: read,
        count: count
    }

    router.get(`${root}${col}`, (q, a) => {
	  connect().then(db => {
		  readCollection(db, col).then(y => {
			if (typeof addCustomInfo === 'function' && Array.isArray(y)) {
              addCustomInfo(db, y, customy => {
			    a.send(customy)
			  })
			} else {
			  a.send(y)
			}
		  })
	  })
      /*const db = await connect()
      try {
		let yy
        const y = await readCollection(db, col)
        if (typeof addCustomInfo === 'function' && Array.isArray(y)) {
          yy = await addCustomInfo(db, y)
        }
        // const yy = await JSON.parse(JSON.stringify(y))
        // console.log('yy', yy)
		console.log('yy', yy)
        a.send(yy)
      } finally {
        await db.close()
      }*/
    })

    router.post(`${root}${col}`, async (q, a) => {
      const db = await connect()
      try {
        const y = await create(q.body)
        await replyCreated(a, q.path, y)
      } catch (e) {
        await a.status(400).send(e)
      } finally {
        await db.close()
      }
    })

    router.get   (`${root}${col}/:id`, (q, a) => get    (`${col}`, q.params.id        ).then(y => replyGot(a, y)))
    router.put   (`${root}${col}/:id`, (q, a) => replace(`${col}`, q.params.id, q.body).then(y => replyReplaced(a, y)))
    router.delete(`${root}${col}/:id`, (q, a) => remove (`${col}`, q.params.id        ).then(y => replyRemoved(a, y)))

    return ctrl
}
module.exports = f
})()
