const db = require('./db');
const express = require('express');
const minionsRouter = express.Router();
const workRouter = require('./workRouter')

minionsRouter.use('/:minionId/work', workRouter);

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if(minion) {
        req.minion = minion;
        next();
    } else { 
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = db.updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('minions', req.minion.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});

module.exports = minionsRouter;
