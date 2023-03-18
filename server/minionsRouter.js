const db = require('./db');
const express = require('express');
const minionsRouter = express.Router();

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
});

module.exports = minionsRouter;
