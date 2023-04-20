const perm = require('../../middlewares/cookiePermissionChecker');
const routeOp = require('../../modules/campusOperations');
const getAllCampusRoute = require('express').Router();

getAllCampusRoute.use(perm.allowPermission(['form', 'review']));
getAllCampusRoute.use(perm.permissionErrGen({ campuses: [], error: null}));

getAllCampusRoute.get('/', (req, res) =>{
    routeOp.getCampuses(res);
});

module.exports = getAllCampusRoute;