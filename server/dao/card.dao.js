'use strict';

const db = require('../db/db');

const {to} = require('await-to-js');
const laneDao = require('./lane.dao');
const Card = require('../models/card');
const Link = require('../models/link');
const CardStatus = require('../enums/CardStatus');
/**
 * Function to create a Card object from a row of the cards table
 * @param {*} row a row of the users table
 */
const createCard = function (row) {
    const id = row.id;
    const laneId = row.laneId;
    const title = row.title;
    const position = row.position;
    const description = row.description;
    const status = row.status
    const deadline = row.deadline;
    return new Card(id, laneId, title, position, status, description, deadline);
}

/**
 * Get single card info
 * @param id
 * @returns {Promise}
 */
function getCard(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT c.*, l.id as linkId, l.value FROM Card c LEFT OUTER JOIN Link l on c.id = l.cardId WHERE c.id = ?';
        db.all(sql, [id], async function(err, rows) {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else {
                const card = createCard(rows[0]);
                card.links = [];
                rows.forEach(row => {
                    if (row.linkId && row.id)
                        card.links.push(new Link(row.linkId, row.id, row.value));
                });
                resolve(card);
            }
        });
    });
}

/**
 * Get single card info
 * @param id
 * @returns {Promise}
 */
function getCards(laneId, filters) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Card WHERE laneId = ? AND (? IS NULL OR (status = ?))";
        db.all(sql, [laneId, filters.status, filters.status], async function(err, rows) {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve([]);
            else {
                const cards = []
                rows.forEach(row => {
                    if (row.laneId && row.id)
                        cards.push(new Card(row.id, row.laneId, row.title, row.position, row.status, row.description, row.deadline));
                });
                resolve(cards);
            }
        });
    });
}

/**
 * Check card card info by id
 * @param id
 * @returns {Promise}
 */
function checkCardById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Card WHERE id = ?';
        db.all(sql, [id], async function(err, rows) {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else {
                resolve(createCard(rows[0]));
            }
        });
    });
}

/**
 * Insert a new card in the database and returns it id.
 */
function insertCard(card) {
    return new Promise((resolve, reject) => {
        db.serialize(async function() {
            let err, lane;
            [err, lane] = await to(laneDao.checkLaneById(card.laneId));
            if (err) {
                console.log(err);
                reject(err);
            } else if (!lane) {
               console.log('Lane with id >'+ card.laneId +'< not found');
               reject('Lane not found');
            } else {
               db.all("SELECT * FROM Card WHERE laneId = ? AND position <= ? AND status = 'Active'",
                   [card.laneId, card.position],
                   (err, rows) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else if (rows && Math.abs(rows.length-card.position) > 0) {
                            reject('Card position is not correct');
                        } else {
                            const sql = 'INSERT INTO Card(laneId, title, position, description, status, deadline) VALUES(?,?,?,?,?,?)';
                            db.run(sql, [card.laneId, card.title, card.position, card.description, card.status, card.deadline], function(err) {
                                if (err){
                                    console.log(err);
                                    reject(err);
                                } else {
                                    console.log('Card with id >'+ this.lastID +'< is added');
                                    resolve(this.lastID);
                                }
                            });
                        }
               });
            }
        });
    });
}

/**
 * Update an existing card with a given id.
 */
function updateCard(id, card) {
    return new Promise((resolve, reject) => {
        db.serialize(async function() {
            let errOldCard, errLane, oldCard, lane;
            [errOldCard, oldCard] = await to(checkCardById(id));
            [errLane, lane] = await to(laneDao.checkLaneById(card.laneId));

            if (errLane || errOldCard) {
                console.log(errLane || errOldCard);
                reject(errLane || errOldCard);
            } else if (!lane) {
                console.log('Lane with id >'+ card.laneId +'< not found');
                reject('Lane not found');
            } else if (!oldCard){
                console.log('Card with id >'+ card.laneId +'< not found');
                reject('Card not found');
            } else {
                const newCard = {...oldCard, ...card};
                db.all("SELECT * FROM Card WHERE laneId = ? AND status = 'Active' ", [newCard.laneId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else if (rows && card.position > rows.length) {
                        reject('Card position is not correct');
                    } else {
                        // START TRANSACTION
                        if (newCard.status === CardStatus.NotActive && oldCard.status === CardStatus.Active) {
                            newCard.position = -1;
                        }
                        if (newCard.status === CardStatus.Active && oldCard.status === CardStatus.NotActive) {
                            newCard.position = rows.length;
                        }
                        db.run('BEGIN');
                        const sql = 'UPDATE Card SET laneId = ?, position = ?, title = ?, description = ?, status = ?, deadline = ? WHERE id = ?';
                        db.run(sql, [newCard.laneId, newCard.position, newCard.title, newCard.description, newCard.status, newCard.deadline, id], (err) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                if (oldCard.laneId !== newCard.laneId || newCard.position === -1) {
                                    const sqlUpdateLane = 'UPDATE Card SET position = position - 1 WHERE laneId = ? AND position > ? AND id <> ? ';
                                    db.run(sqlUpdateLane, [oldCard.laneId, oldCard.position, newCard.id], (err) => {
                                        if (err) {
                                            db.run('ROLLBACK');
                                            console.log(err);
                                            reject(err);
                                        } else {
                                            db.run('COMMIT');
                                            resolve(true);
                                        }
                                    });
                                } else if (oldCard.laneId === newCard.laneId && oldCard.position !== newCard.position) {
                                    const sqlUpdatePos = 'UPDATE Card SET position = ? WHERE laneId = ? AND position = ? AND id <> ?';
                                    db.run(sqlUpdatePos, [oldCard.position, newCard.laneId, newCard.position, newCard.id], (err) => {
                                        if (err) {
                                            db.run('ROLLBACK');
                                            console.log(err);
                                            reject(err);
                                        } else {
                                            db.run('COMMIT');
                                            resolve(true);
                                        }
                                    });
                                } else {
                                    db.run('COMMIT');
                                    resolve(true);
                                }
                            }
                        });
                    }
                });
            }
        });
    });
}

/**
 * Delete a card with a given id
 */
function deleteCard(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Card WHERE id = ?';
        db.run(sql, [id], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}

module.exports = {
    getCard, getCards, checkCardById, updateCard, insertCard, deleteCard
}
