const routeOp = require('../../modules/accountOperations');
const params = require('../../modules/paramCheck');
const loginRoute = require('express').Router();

loginRoute.post('/', (req, res) => {
    // initialize missed parameter response
    const missedParams = params.paramCheck(['username', 'password'], req.body);
    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    const { username, password } = req.body;
    routeOp.login(username, password, res);
});

module.exports = loginRoute;