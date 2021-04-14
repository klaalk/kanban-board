'use strict';

const db = require('../db/db');
const {to} = require('await-to-js');
const userDao = require('./user.dao');
const boardDao = require('./board.dao');
/**
 * Insert a shared board in the database and returns it id.
 */
exports.insertSharedBoard = function (boardId, username) {
    return new Promise((resolve, reject) => {
        db.serialize(async function () {
            let errBoard, errUser, board, user;
            [errBoard, board] = await to(boardDao.checkBoardById(boardId));
            [errUser, user] = await to(userDao.getUser(username));

            if (errUser || errBoard) {
                console.log(errUser || errBoard);
                reject(errUser || errBoard);
            } else if (!board){
                console.log('Board with id >'+boardId+'< not found');
                reject('Board not found');
            } else if (!user) {
                console.log('User with username >'+username+'< not found');
                reject('User not found');
            } else if (user.id === board.userId) {
                console.log('User with username >'+username+'< is the owner of the board with id >'+boardId+'<');
                reject('User is the owner of the board');
            } else {
                const sql = 'INSERT INTO SharedBoard(boardId, userId, sharedDate) VALUES(?,?, CURRENT_DATE)';
                db.run(sql, [boardId, user.id], function(err) {
                    if (err){
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('Board with id >'+ board.id +'< is shared with the user >' + user.id + '<');
                        resolve(true);
                    }
                });

            }
        });
    });
}
