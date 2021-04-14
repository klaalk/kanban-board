'use strict';

//import express
const express = require('express');
const morgan = require('morgan'); // logging middleware
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const jsonWebToken = require('jsonwebtoken');
const userDao = require('./dao/user.dao');

// Authorization error
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };

// Server info
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 300; //seconds
const port = 3001;
const apiPrefix = '/api/v1';

// Create application and router
const app = express();

// Set-up logging
app.use(morgan('tiny'));

// Process body content
app.use(express.json());

// Cookie
app.use(cookieParser());

/* -------------------------------------------------- PUBLIC API v1 -------------------------------------------------- */

const publicApi = express.Router();

// Authentication endpoint
publicApi.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userDao.getUser(username)
        .then((user) => {
            if(!user) {
                res.status(404).send({
                    errors: [{ 'param': 'Server', 'msg': 'Invalid username' }]
                });
            } else {
                if(!userDao.checkPassword(user, password)){
                    res.status(401).send({
                        errors: [{ 'param': 'Server', 'msg': 'Invalid password' }]
                    });
                } else {
                    //AUTHENTICATION SUCCESS
                    const token = jsonWebToken.sign({ user: user.id },jwtSecret, {expiresIn: expireTime});
                    res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
                    res.json(
                        {id: user.id, name: user.name, surname: user.surname, username: user.username, email: user.email}
                        );
                }
            }
        }).catch(
        // Delay response when wrong user/pass is sent to avoid fast guessing attempts
        (err) => {
            new Promise((resolve) => {setTimeout(resolve, 1000)})
                .then(() => res.status(401).json(authErrorObj));
        }
    );
});

publicApi.post('/logout', (req, res) => {
    res.clearCookie('token').json({msg: 'logged out'});
});

// Set public api prefix
app.use(apiPrefix, publicApi);

/* -------------------------------------------------- AUTH API v1 -------------------------------------------------- */

// For the rest of the code, all APIs require authentication
app.use(
    jwt({
        secret: jwtSecret,
        getToken: req => req.cookies.token
    })
);

// To return a better object in case of errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json(authErrorObj);
    }
});

// Set user router api's prefix
const userApi = require('./api/user.api');
app.use(apiPrefix, userApi);

// Set board router api's prefix
const boardApi = require('./api/board.api');
app.use(apiPrefix, boardApi);

// Set lane router api's prefix
const laneApi = require('./api/lane.api');
app.use(apiPrefix, laneApi);

// Set card router api's prefix
const cardApi = require('./api/card.api');
app.use(apiPrefix, cardApi);

// Set card router api's prefix
const linkApi = require('./api/link.api');
app.use(apiPrefix, linkApi);

app.listen(port, ()=>console.log(`Server running on http://localhost:${port}/`));
