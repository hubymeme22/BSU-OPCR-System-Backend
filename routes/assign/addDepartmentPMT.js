/*
    In this route, the assigning of target for department will be done
*/
const assignDepartmentPmt = require('express').Router();
const params = require('../../modules/paramCheck');
const routeOp = require('../../modules/assignOperations');

assignDepartmentPmt.post('/:campusName/:departmentName', (req, res) => {
    const missedParams = params.paramCheck(['targetID'], req.body);
    if (missedParams.length > 0)
        return res.json({ assigned: false, error: `MissedParams=${missedParams}` });

    const { campusName, departmentName } = req.params;
    const targetID = req.body.targetID;
    routeOp.assignDepartmentTarget(campusName, departmentName, targetID);
});

module.exports = assignDepartmentPmt;