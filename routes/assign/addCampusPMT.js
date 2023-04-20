/*
    In this route, the scope for campus' target and goals
    will be assigned.
*/
const perm = require('../../middlewares/cookiePermissionChecker');
const assignCampusPmt = require('express').Router();
const params = require('../../modules/paramCheck');
const routeOp = require('../../modules/assignOperations');

// set permission checking (only allowed for form accounts)
assignCampusPmt.use(perm.specifiedPermissionCheck(['form']));
assignCampusPmt.use(perm.permissionErrGen({ assigned: false, error: null }));

// assigns a set of goals for a specific campus
assignCampusPmt.post('/:campusName', (req, res) => {
    const missedParams = params.paramCheck(['scopeID'], req.body);
    if (missedParams.length > 0)
        return res.json({ assigned: false, error: `MissedParams=${missedParams}` });

    routeOp.assignCampusTarget(req.params.campusName, req.body.scopeID, res);
});

module.exports = assignCampusPmt;