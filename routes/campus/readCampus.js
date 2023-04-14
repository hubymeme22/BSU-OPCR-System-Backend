const routeOp = require('../../modules/campusOperations');
const createCampusRoute = require('express').Router();

createCampusRoute.get('/', (req, res) =>{
    routeOp.getCampuses(res);
});

module.exports = createCampusRoute;