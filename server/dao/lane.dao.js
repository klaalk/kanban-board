'use strict';

const db = require('../db/db');
const {to} = require('await-to-js');
const boardDao = require('./board.dao');
const Lane = require('../models/lane');

/**
 * Function to create a Lane object from a row of the lanes table
 * @param {*} row a row of the users table
 */
const createLane = function (row) {
    const id = row.id;
    const boardId = row.boardId;
    const title = row.title;
    const position = row.position;
    return new Lane(id, boardId, title, position);
}

/**
 * Insert a new lane in the database and returns it id.
 */
function insertLane(lane) {
    return new Promise((resolve, reject) => {
        db.serialize(async function() {
            let err, board;
            [err, board] = await to(boardDao.checkBoardById(lane.boardId));
            if (err) {
                console.log(err);
                reject(err);
            } else if (!board){
                console.log('Board with id >'+lane.boardId+'< not found');
                reject('Board not found');
            } else {
                db.all('SELECT * FROM Lane WHERE boardId = ? AND position <= ?',
                    [lane.boardId, lane.position],
                    (err, rows) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else if (rows && Math.abs(rows.length-lane.position) > 0) {
                            reject('Lane position is not correct');
                        } else {
                            const sql = 'INSERT INTO Lane(boardId, title, position) VALUES(?,?,?)';
                            db.run(sql, [lane.boardId, lane.title, lane.position], function(err) {
                                if (err){
                                    const errorMsg = 'Error on insert lane for board id ' + lane.boardId;
                                    console.log(errorMsg);
                                    console.log(err);
                                    reject(errorMsg);
                                } else {
                                    console.log('Lane with id >'+ this.lastID +'< is added for the board with id >'+lane.boardId+'<');
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
 * Update an existing lane with a given id.
 */
function updateLane(id, lane) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Lane SET title = ? WHERE id = ?';
        db.run(sql, [lane.title, id], (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(true);
        })
    });
}

/**
 * Check an existing lane by id
 */
function checkLaneById(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Lane WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else {
                resolve(createLane(rows[0]));
            }
        })
    });
}


/**
 * Delete a lane with a given id
 */
function deleteLane(id) {
    return new Promise((resolve, reject) => {
        db.serialize(async function() {
            const [err, lane] = await to(checkLaneById(id));
            if (err) {
                console.log(err);
                reject(err);
            } else if (!lane) {
                console.log('Lane not found');
                resolve(true);
            } else {
                db.all('SELECT * FROM Lane WHERE boardId = ?', [lane.boardId],
                    (err, rows) => {
                        if (err) {
                            console.log(err)
                            reject(err);
                        } else if (!rows || rows.length <= 2) {
                            console.log('Board constraint: at least two lane');
                            reject('Board constraint: at least two lane');
                        } else {
                            const sql = 'DELETE FROM Lane WHERE id = ?';
                            db.run(sql, [id], (err) => {
                                if(err)
                                    reject(err);
                                else
                                    resolve(true);
                            });
                        }
                    }
                );
            }
        });
    });
}

module.exports = {
    insertLane, updateLane, checkLaneById, deleteLane
}
