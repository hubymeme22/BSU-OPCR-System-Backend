const routeOp = require('../../modules/campusOperations');
const getAllCampusRoute = require('express').Router();

getAllCampusRoute.get('/', (req, res) =>{
    routeOp.getCampuses(res);
});

module.exports = getAllCampusRoute;