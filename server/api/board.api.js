'use strict';

const express = require('express');
const {body, param, validationResult} = require('express-validator');

const boardDao = require('../dao/board.dao');
const sharedBoardDao = require('../dao/shared-board.dao');

const boardApi = express.Router();

/**
 * Create new board
 */
boardApi.post('/boards', [
        body('title').exists(),
        body('userId').exists().isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const board = req.body;
            boardDao.insertBoard(board)
                .then((id) => res.status(201).json({"id" : id}))
                .catch((err) => {
                    res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
                });
        }
});

/**
 * Delete board by id
 */
boardApi.delete('/boards/:boardId', [
        param('boardId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            boardDao.deleteBoard(req.params.boardId)
                .then(() => res.status(204).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
    }
);

/**
 * Share the board with the user
 */
boardApi.post('/boards/:boardId/users', [
        param('boardId').isNumeric(),
        body('username').exists(),
    ],
    (req,res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const user = req.body;
            sharedBoardDao.insertSharedBoard(req.params.boardId, user.username)
                .then(() => res.status(200).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
    }
);

/**
 * Get board's lanes by id
 */
boardApi.get('/boards/:boardId', [
        param('boardId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            boardDao.getBoard(req.params.boardId)
                .then((board) => {
                    if(!board) {
                        res.status(404).end();
                    } else {
                        res.json(board);
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        errors: [{'param': 'Server', 'msg': err}],
                    });
                });
        }
    }
);

module.exports = boardApi;
