'use strict';

const express = require('express');

const {body, param, validationResult} = require('express-validator');
const cardDao = require('../dao/card.dao');
const cardApi = express.Router();
const CardStatus = require('../enums/CardStatus');

/**
 * Create new card
 */
cardApi.post('/cards', [
        body('laneId').exists().isNumeric(),
        body('position').exists().isNumeric(),
        body('title').exists(),
        body('description').exists(),
        body('status').exists().isIn([CardStatus.Active, CardStatus.NotActive])
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const card = req.body;
            cardDao.insertCard(card)
                .then((id) => res.status(201).json({"id" : id}))
                .catch((err) => {
                    res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
                });
        }
    }
);

/**
 * Get card by id
 */
cardApi.get('/cards/:cardId', [
        param('cardId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            cardDao.getCard(req.params.cardId)
                .then((card) => {
                    if(!card){
                        res.status(404).send();
                    } else {
                        res.json(card);
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        errors: [{'param': 'Server', 'msg': err}],
                    });
                });
        }
});

/**
 * Delete card by id
 */
cardApi.delete('/cards/:cardId', [
        param('cardId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            cardDao.deleteCard(req.params.cardId)
                .then((result) => res.status(204).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
});

/**
 * Change card by id
 */
cardApi.put('/cards/:cardId', [
        param('cardId').isNumeric(),
        body('laneId').isNumeric(),
        body('position').isNumeric(),
        body('status').isIn([CardStatus.Active, CardStatus.NotActive])
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const card = req.body;
            cardDao.updateCard(req.params.cardId, card)
                .then((result) => res.status(200).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
});

module.exports = cardApi;
