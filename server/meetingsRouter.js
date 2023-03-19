const db = require('./db');
const express = require('express');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = db.deleteAllFromDatabase('meetings', req.params.minionId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});

module.exports = meetingsRouter;
