/*
    In this route, the assigning of target for department will be done
*/
const assignCampusPmt = require('express').Router();
const params = require('../../modules/paramCheck');
const routeOp = require('../../modules/assignOperations');

assignCampusPmt.post('/department/:campusName/:departmentName', (req, res) => {
    const missedParams = params.paramCheck(['target'], req.body);
    if (missedParams.length > 0)
        return res.json({ assigned: false, error: `MissedParams=${missedParams}` });

    const { campusName, departmentName } = req.params;
    const target = req.body.target;
    routeOp.assignDepartmentTarget(campusName, departmentName, target);
});

module.exports = assignCampusPmt;