const perm = require('../../middlewares/cookiePermissionChecker');
const routeOp = require('../../modules/pmtOperations');
const readPmtRoute = require('express').Router();

// set permission checking
const responseFormat = { pmt: [], error: null };
readPmtRoute.use(perm.allowPermission(['form', 'review']));
readPmtRoute.use(perm.permissionErrGen(responseFormat));

// gets all the list of targets
readPmtRoute.get('/', (req, res) => {
    routeOp.getTargets(res);
});

module.exports = readPmtRoute;