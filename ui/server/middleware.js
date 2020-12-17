const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./users');

// app
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// Token
const jwtSecret = 'my-dev-secret';
let token;

// Sign in
app.post('/auth', (req, res) => {
    const username = String(req.body.username).toLowerCase();

    if (users.has(username) && users.get(username) === req.body.password) {
        token = jwt.sign({ data: username }, jwtSecret, { expiresIn: '1 week' });
        res.status(200).send(token);
    } else {
        res.status(403).end();
    }
});

// Sign out
app.post('/auth/signout', (req, res) => {
    token = '';
    res.status(204).end();
});

// Create Graph
app.post('/graphs', (req, res) => {
    try {
        jwt.verify(req.get('Authorization'), jwtSecret, () => {
            if (req.body.graphName === 'fail') {
                res.status(500).end();
            } else {
                res.status(201).end();
            }
        });
    } catch (e) {
        res.status(403).end();
    }
});

// Get all graphs
app.get('/graphs', (req, res) => {
    try {
        jwt.verify(req.get('Authorization'), jwtSecret, () => {
            res.send([
                {
                    graphName: 'roadTraffic',
                    currentState: 'DEPLOYED',
                },
                {
                    graphName: 'basicGraph',
                    currentState: 'DEPLOYED',
                },
            ]);
        });
    } catch (e) {
        res.status(403).end();
    }
});

// Get graph by ID
app.get('/graphs/:graphName', (req, res) => {
    try {
        jwt.verify(req.get('Authorization'), jwtSecret, () => {
            res.status(200).send({
                graphName: req.params.graphName,
                currentState: 'DEPLOYED',
            });
        });
    } catch (e) {
        res.status(403).end();
    }
});

// Delete graph by ID
app.delete('/graphs/:graphName', (req, res) => {
    try {
        jwt.verify(req.get('Authorization'), jwtSecret, () => {
            res.status(204).end();
        });
    } catch (e) {
        res.status(403).end();
    }
});
module.exports = server;
