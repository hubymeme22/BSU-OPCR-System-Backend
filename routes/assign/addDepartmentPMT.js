/*
    In this route, the assigning of target for department will be done
*/
const perm = require('../../middlewares/cookiePermissionChecker');
const assignDepartmentPmt = require('express').Router();
const params = require('../../modules/paramCheck');
const routeOp = require('../../modules/assignOperations');

// set permission checking (only allowed for form accounts)
assignDepartmentPmt.use(perm.specifiedPermissionCheck(['form']));
assignDepartmentPmt.use(perm.permissionErrGen({ assigned: false, error: null }));

// assign a goal for a specific department
assignDepartmentPmt.post('/:campusName/:departmentName', (req, res) => {
    const missedParams = params.paramCheck(['targetID'], req.body);
    if (missedParams.length > 0)
        return res.json({ assigned: false, error: `MissedParams=${missedParams}` });

    const { campusName, departmentName } = req.params;
    const targetID = req.body.targetID;
    routeOp.assignDepartmentTarget(campusName, departmentName, targetID);
});

module.exports = assignDepartmentPmt;