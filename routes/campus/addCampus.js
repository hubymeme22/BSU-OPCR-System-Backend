// POST /api/campus/:campusName
const perm = require('../../middlewares/cookiePermissionChecker');
const routeOp = require('../../modules/campusOperations');
const params = require('../../modules/paramCheck');
const addCampusRoute = require('express').Router();

addCampusRoute.use(perm.specifiedPermissionCheck(['form']));
addCampusRoute.use(perm.permissionErrGen({added: false, summary:{}, error: null}));

addCampusRoute.post('/',(req, res) =>{
    let missedParams = params.paramCheck(['campus_name'], req.body);
    const responseFormat={added: false, summary:{}, error: null};

    if(missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    //still clueless what to do next here.
    routeOp.addCampus(req.body.campus_name, res);
})

module.exports = addCampusRoute;