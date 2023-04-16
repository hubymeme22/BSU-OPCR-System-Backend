const routeOp = require('../../modules/accountOperations');
const params = require('../../modules/paramCheck');
const registerAdminRoute = require('express').Router();

registerAdminRoute.post('/admin', (req, res) => {
    // initialize missed parameter response
    let missedParams = params.paramCheck(['username', 'password', 'email', 'name'], req.body);
    missedParams += params.paramCheck(['first', 'last'], req.body.name);
    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    routeOp.registerAdminAccount(req.body, res);
});

module.exports = registerAdminRoute;