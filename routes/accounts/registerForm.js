const routeOp = require('../../modules/accountOperations');
const params = require('../../modules/paramCheck');
const registerFormRoute = require('express').Router();

registerFormRoute.post('/form', (req, res) => {
    // initialize missed parameter response
    let missedParams = params.paramCheck(['username', 'password', 'email', 'name'], req.body);
    missedParams += params.paramCheck(['first', 'last'], req.body.name);
    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    routeOp.registerFormAccount(req.body, res);
});

module.exports = registerFormRoute;