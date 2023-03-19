const db = require('./db');
const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    let updatedIdeaInstance = db.updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdeaInstance);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('ideas', req.idea.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});

module.exports = ideasRouter;
