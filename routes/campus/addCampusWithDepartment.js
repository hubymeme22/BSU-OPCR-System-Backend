// POST /api/campus/:campusName
const perm = require('../../middlewares/cookiePermissionChecker');
const routeOp = require('../../modules/campusOperations');
const params = require('../../modules/paramCheck');
const addCampusWithDepartmentRoute = require('express').Router();


// addCampusWithDepartmentRoute.use(perm.specifiedPermissionCheck(['form']));
// addCampusWithDepartmentRoute.use(perm.permissionErrGen({added: false, summary:{}, error: null}));

addCampusWithDepartmentRoute.post('/',(req, res) =>{
    let missedParams = params.paramCheck(['campus_name', 'department'], req.body);
    const responseFormat={added: false, summary:{}, error: null};

    if(missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }
 
    // checking req.body.department if empty 
    
    missedParamsInArray = params.arrayParamChecker(['name', 'assignedTo'], req.body.department);

    if (missedParamsInArray.length > 0) {
        responseFormat.error = `Department objects missing parameters: ${JSON.stringify(missedParams)}`;
        return res.json(responseFormat);
    }

    routeOp.addCampusWithDepartments(req.body.campus_name, req.body.department, res);
})

module.exports = addCampusWithDepartmentRoute;