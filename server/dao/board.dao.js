'use strict';

const db = require('../db/db');
const {to} = require('await-to-js');
const laneDao = require('./lane.dao');
const userDao = require('./user.dao');
const Board = require('../models/board');
const Lane = require('../models/lane');
const Card = require('../models/card');


/**
 * Function to create a Board object from a row of the boards table
 * @param {*} row a row of the users table
 */
const createBoard = function (row) {
    const id = row.id;
    const title = row.title;
    const userId = row.userId;
    const username = row.username;
    const shared = row.shared;
    const sharedDate = row.sharedDate;
    const totalCards = row.totalCards;
    const expiredCards = row.expiredCards;
    return new Board(id, userId, username, title, shared, sharedDate, totalCards, expiredCards);
}

/**
 * Get boards that a user own
 * @param userId
 * @returns {Promise}
 */
exports.getBoards = function (userId, filters) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT b.*, u.username, sb.boardId IS NOT NULL as shared, sb.sharedDate, bc.totalCards, bc.expiredCards ' +
                    'FROM Board b ' +
                    'LEFT OUTER JOIN SharedBoard sb ON sb.boardId = b.id ' +
                    'LEFT OUTER JOIN User u ON u.id = b.userId ' +
                    'LEFT OUTER JOIN ( SELECT l.boardId, ' +
                                            'COUNT(*) as totalCards, ' +
                                            'SUM(CASE WHEN (deadline IS NOT NULL AND deadline < CURRENT_DATE) then 1 else 0 end) as expiredCards ' +
                                        'FROM Card c ' +
                                        'LEFT OUTER JOIN Lane l ON c.laneId = l.id ' +
                                        'GROUP BY l.boardId) bc ON bc.boardId = b.id ' +
                    'WHERE (b.userId = ? OR sb.userId = ?) ' +
                    'AND (? IS FALSE OR sb.boardId IS NOT NULL) ' +
                    'GROUP BY b.id';
        db.all(sql, [userId, userId,  filters.shared === "true"], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(rows.map((row) => createBoard(row)));
            }
        });
    });
}

exports.getBoard = function (boardId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT b.*, l.id as laneId, l.title as laneTitle, l.position as lanePosition, " +
                "c.id as cardId, c.title as cardTitle, c.position as cardPosition, c.status, c.description, c.deadline " +
            "FROM Board b " +
            "LEFT OUTER JOIN Lane l ON b.id = l.boardId " +
            "LEFT OUTER JOIN Card c ON (c.laneId = l.id AND c.status = 'Active')" +
            "WHERE b.id = ?";
        db.all(sql, [boardId], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else {
                const board = createBoard(rows[0]);
                const lanes = new Map();
                rows.forEach(row => {
                    if (row.laneId) {
                        let lane = lanes.get(row.laneId);
                        if (!lane)
                            lane = new Lane(row.laneId, row.id, row.laneTitle, row.lanePosition);

                        const card = new Card(row.cardId, row.laneId, row.cardTitle, row.cardPosition, row.status, row.description, row.deadline);
                        lane.addCard(card);
                        lanes.set(lane.id, lane);
                    }
                });
                board.lanes = [...lanes.values()];
                resolve(board);
            }
        });
    });
}

exports.checkBoardById = function (boardId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Board WHERE id = ?';
        db.all(sql, [boardId], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length === 0)
                resolve(false);
            else {
                resolve(createBoard(rows[0]));
            }
        });
    });
}

/**
 * Insert a board in the database and returns it id.
 */
exports.insertBoard = async function (board) {
    return new Promise( (resolve, reject) => {
        db.serialize(async function () {
            let err, user;
            [err, user] = await to(userDao.getUserById(board.userId));
            if (err) {
                console.log(err);
                reject(err);
            } else if (user) {
                const sql = 'INSERT INTO Board(title, userId) VALUES(?,?)';
                db.run(sql, [board.title, board.userId], async function(err) {
                    if (err){
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('Board with id >'+ this.lastID +'< is added');
                        let err, lane;
                        [err, lane] = await to(laneDao.insertLane({boardId: this.lastID, title: 'To do', position: 0}));
                        [err, lane] = await to(laneDao.insertLane({boardId: this.lastID, title: 'Done', position: 1}));
                        if (err) {
                            console.log(err);
                        }
                        resolve(this.lastID);
                    }
                });
            } else {
                console.log('User with id >'+ board.userId + '< not found');
                reject('User not found');
            }
        });
    });
}

/**
 * Update an existing board with a given id.
 */
exports.updateBoard = function (id, {title}) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Board SET title = ? WHERE id = ?';
        db.run(sql, [title, id], (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(null);
        })
    });
}

/**
 * Delete a board with a given id
 */
exports.deleteBoard = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Board WHERE id = ?';
        db.run(sql, [id], (err) => {
            if(err)
                reject(err);
            else
                resolve(true);
        })
    });
}
