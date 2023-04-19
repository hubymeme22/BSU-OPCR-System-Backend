// DELETE /api/campus/:campusName
const perm = require('../../middlewares/cookiePermissionChecker');
const routeOp = require('../../modules/campusOperations');
const deleteCampusRoute = require('express').Router();

deleteCampusRoute.use(perm.specifiedPermissionCheck(['form']));
deleteCampusRoute.use(perm.permissionErrGen({added: false, summary:{}, error: null}));

deleteCampusRoute.delete('/:id', (req, res) => {
    routeOp.deleteCampus(req.params.id, res);
    
})

module.exports = deleteCampusRoute;