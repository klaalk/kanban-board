'use strict';

const express = require('express');
const {body, param, validationResult} = require('express-validator');
const linkDao = require('../dao/link.dao');
const linkApi = express.Router();

/**
 * Create new link
 */
linkApi.post('/links', [
        body('cardId').exists().isNumeric(),
        body('value').exists(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const link = req.body;
            linkDao.insertLink(link)
                .then((id) => res.status(201).json({"id" : id}))
                .catch((err) => {
                    res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
                });
        }
    }
);

/**
 * Delete link by id
 */
linkApi.delete('/links/:linkId', [
        param('linkId').isNumeric(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            linkDao.deleteLink(req.params.linkId)
                .then((result) => res.status(204).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
});

/**
 * Change link by id
 */
linkApi.put('/links/:linkId', [
        body('value').exists(),
    ],
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const link = req.body;
            linkDao.updateLink(req.params.linkId, link)
                .then(() => res.status(200).end())
                .catch((err) => res.status(500).json({
                    errors: [{'param': 'Server', 'msg': err}],
                }));
        }
});

module.exports = linkApi;
