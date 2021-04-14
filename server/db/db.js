'use strict';

const SQLite = require('sqlite3').verbose();

const DBSOURCE = './db/kanban.db';

const db = new SQLite.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
});

module.exports = db;
