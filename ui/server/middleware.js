const express = require('express');
const users = require('./users');

// app
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// Token
const token = Date.now().toString();

// Sign in
app.post('/auth', (req, res) => {
    const username = String(req.body.username).toLowerCase();

    if (users.has(username) && users.get(username) === req.body.password) {
        res.status(200).send(token);
    } else {
        res.status(403).end();
    }
});

// Sign out
app.post('/auth/signout', (req, res) => {
    res.status(201).end();
});

// Create Graph
app.post('/graphs', (req, res) => {
    if (req.body.graphName === 'fail') {
        res.status(500).end();
    } else {
        res.status(201).end();
    }
});

// Get all graphs
app.get('/graphs', (req, res) => {
    if (req.get('Authorization') === token) {
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
    } else {
        res.status(403).end();
    }
});

// Get graph by ID
app.get('/graphs/:graphName', (req, res) => {
    if (req.get('Authorization') === token) {
        res.send({
            graphName: req.params.graphName,
            currentState: 'DEPLOYED',
        });
    } else {
        res.status(403).end();
    }
});

// Delete graph by ID
app.delete('/graphs/:graphName', (req, res) => {
    if (req.get('Authorization') === token) {
        res.status(202).end();
    } else {
        res.status(403).end();
    }
});
