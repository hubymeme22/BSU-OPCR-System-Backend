// DELETE /api/campus/:campusName
const routeOp = require('../../modules/campusOperations');
const params = require('../../modules/paramCheck');
const deleteCampusRoute = require('express').Router();

deleteCampusRoute.delete('/:id', (req, res) => {
    routeOp.deleteCampus(req.params.id, res);
    
})

module.exports = deleteCampusRoute;