// POST /api/campus/:campusName
const routeOp = require('../../modules/campusOperations');
const params = require('../../modules/paramCheck');
const addCampusRoute = require('express').Router();

addCampusRoute.post('/',(req, res) =>{
    let missedParams = params.paramCheck(['campus_name', 'department_name', 'assigned_to' ,'opcr'], req.body);
    const responseFormat={added: false, summary:{}, error: null};

    if(missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    //still clueless what to do next here.

    routeOp.addCampus(req.body.campus_name, req.body.department_name, req.body.assigned_to, req.body.opcr);
})

module.exports = addCampusRoute;