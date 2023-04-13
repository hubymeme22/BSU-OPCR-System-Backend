const routeOp = require('../../modules/pmtOperations');
const createPMTRoute = require('express').Router();

// gets all the list of targets
createPMTRoute.get('/', (req, res) => {
    routeOp.getTargets(res);
});

module.exports = createPMTRoute;