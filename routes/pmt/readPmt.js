const routeOp = require('../../modules/pmtOperations');
const readPmtRoute = require('express').Router();

// gets all the list of targets
readPmtRoute.get('/', (req, res) => {
    routeOp.getTargets(res);
});

module.exports = readPmtRoute;