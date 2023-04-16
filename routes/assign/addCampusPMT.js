/*
    In this route, the scope for campus' target and goals
    will be assigned.
*/
const assignCampusPmt = require('express').Router();
const params = require('../../modules/paramCheck');
const routeOp = require('../../modules/assignOperations');

assignCampusPmt.post('/campus/:campusName', (req, res) => {
    const missedParams = params.paramCheck(['scope'], req.body);
    if (missedParams.length > 0)
        return res.json({ assigned: false, error: `MissedParams=${missedParams}` });

    routeOp.assignCampusTarget(req.params.campusName, req.body.scope, res);
});

module.exports = assignCampusPmt;