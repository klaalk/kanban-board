'use strict';

const db = require('../db/db');
const bCrypt = require('bcrypt');
const User = require('../models/user');

/**
 * Function to create a User object from a row of the users table
 * @param {*} row a row of the users table
 */
const createUser = function (row) {
    const id = row.id;
    const name = row.name;
    const surname = row.surname;
    const email = row.email;
    const username = row.username;
    const hash = row.hash;
    return new User(id, name, surname, username, email, hash);
}

exports.getUsers = function() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM User"
        db.all(sql, (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve([]);
            else{
                resolve(rows.map(row => ({id: row.id, username: row.username})));
            }
        });
    });
}

exports.getUser = function(username) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM User WHERE username = ?"
        db.all(sql, [username], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else{
                const user = createUser(rows[0]);
                resolve(user);
            }
        });
    });
}

exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM User WHERE id = ?'
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else{
                const user = createUser(rows[0]);
                resolve(user);
            }
        });
    });
};

exports.checkPassword = function(user, password){
    // let hash = bCrypt.hashSync(password, 10);
    return bCrypt.compareSync(password, user.hash);
}
