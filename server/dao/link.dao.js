'use strict';

const db = require('../db/db');
const {to} = require('await-to-js');
const cardDao = require('./card.dao');

/**
 * Insert a new link in the database and returns it id.
 */
function insertLink(link) {
    return new Promise((resolve, reject) => {
        db.serialize(async function() {
            let err, card;
            [err, card] = await to(cardDao.checkCardById(link.cardId));
            if (err) {
                console.log(err);
                reject(err);
            } else if (!card) {
                console.log('Card with id >'+link.cardId+'< not found');
                reject('Card not found');
            } else {
                const sql = 'INSERT INTO Link(cardId, value) VALUES(?,?)';
                db.run(sql, [link.cardId, link.value], function(err) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('Link with id >'+ this.lastID +'< is added');
                        resolve(this.lastID);
                    }
                });
            }
        });
    });
}

/**
 * Update an existing card with a given id.
 */
function updateLink(id, link) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Link SET value = ? WHERE id = ?';
        db.run(sql, [link.value, link.id], (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * Delete a card with a given id
 */
function deleteLink(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Link WHERE id = ?';
        db.run(sql, [id], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}

module.exports = {insertLink, updateLink, deleteLink}
