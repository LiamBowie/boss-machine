const db = require('./db');
const express = require('express');
const workRouter = express.Router({mergeParams:true});

workRouter.param('workId', (req, res, next, id) => {
    const work = db.getFromDatabaseById('work', id);
    if(work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

workRouter.get('/', (req, res, next) => {
    const work = db.getAllFromDatabase('work').filter((singleWork) => { 
        return singleWork.minionId === req.params.minionId;
    })
    res.send(work);
});

workRouter.post('/', (req, res, next) => {
    const newWork = db.addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

workRouter.put('/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId) { 
        res.status(400).send();
    } else {
        const updatedWork = db.updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

workRouter.delete('/:workId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
        res.status(204);
      } else {
        res.status(500);
      }
      res.send();
});

module.exports = workRouter;
