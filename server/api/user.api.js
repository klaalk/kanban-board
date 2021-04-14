'use strict';

const express = require('express');
const {param, validationResult} = require('express-validator');


const boardDao = require('../dao/board.dao');
const userDao = require('../dao/user.dao');

const userApi = express.Router();

/**
 * GET the user info from user id
 */
userApi.get('/user', (req,res) => {
    const userId = req.user && req.user.user;
    userDao.getUserById(userId)
        .then((user) => {
            if (user){
                res.json({id: user.id, name: user.name, surname: user.surname, username: user.username});
            } else {
                res.status(404).end();
            }
        }).catch(() => {
            res.status(401).json(authErrorObj);
        });
});

/**
 * GET list of users
 */
userApi.get('/users',
    (req, res) => {
        userDao.getUsers()
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                });
            });
    }
);

/**
 * GET list of boards that the user owned or shared with
 */
userApi.get('/users/:userId/boards',
    [param('userId').isNumeric()],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            boardDao.getBoards(req.params.userId, req.query)
                .then((boards) => {
                    res.json(boards);
                })
                .catch((err) => {
                    res.status(500).json({
                        errors: [{'param': 'Server', 'msg': err}],
                    });
                });
        }
    }
);

module.exports = userApi;
