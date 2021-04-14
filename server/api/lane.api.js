'use strict';

const express = require('express');
const laneDao = require('../dao/lane.dao');
const cardDao = require('../dao/card.dao');

const {body, param, validationResult} = require('express-validator');

const laneApi = express.Router();

/**
 * Create new lane
 */
laneApi.post('/lanes', [
        body('title').exists(),
        body('position').exists().isNumeric(),
        body('boardId').exists().isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const lane = req.body;
            laneDao.insertLane(lane)
                .then((id) => res.status(201).json({"id": id}))
                .catch((err) => {
                    res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
                });
        }
    }
);

/**
 * Get cards by lane id
 */
laneApi.get('/lanes/:laneId/cards',[
        param('laneId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            cardDao.getCards(req.params.laneId, req.query)
                .then((cards) => res.json(cards))
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
    }
);

/**
 * Delete lane by id
 */
laneApi.delete('/lanes/:laneId', [
        param('laneId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            laneDao.deleteLane(req.params.laneId)
                .then(() => res.status(204).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
    }
);

/**
 * Change lane by id
 */
laneApi.put('/lanes/:laneId', [
        param('laneId').isNumeric(),
        body('title').exists(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const lane = req.body;
            laneDao.updateLane(req.params.laneId, lane)
                .then(() => res.status(200).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
    }
);

module.exports = laneApi;
