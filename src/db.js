'use strict';
(function() {
    const mongoose = require('mongoose')
    let f = async function(mongoUrl, dbname) {
        let db = await mongoose.createConnection(`${mongoUrl}/${dbname}`, { useNewUrlParser: true })
        return db
    }
    module.exports = f
})()
