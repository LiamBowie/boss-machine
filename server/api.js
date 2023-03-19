const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
