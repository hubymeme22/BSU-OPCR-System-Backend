const perm = require('../../middlewares/cookiePermissionChecker');
const routeOp = require('../../modules/pmtOperations');
const params = require('../../modules/paramCheck');
const createPMSRoute = require('express').Router();

// set permission checking
createPMSRoute.use(perm.specifiedPermissionCheck(['form']));
createPMSRoute.use(perm.permissionErrGen({ added: false, summary: {}, error: null }))

// create a new target pmt
createPMSRoute.post('/', (req, res) => {
    // initialize missed parameter response
    let missedParams = params.paramCheck(['target', 'key_indicators'], req.body);
    const responseFormat = { added: false, summary: {}, error: null };

    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    // another check for confirming the format of each key_indicators
    missedParams = [];
    req.body.key_indicators.forEach((keySuccess, index) => {
        if (!keySuccess.key || !keySuccess.success)
            missedParams.push(`key_indicator-${index}`);
    });

    // send the missed params
    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    // sends the modified requests
    routeOp.setTarget(req.body.target, req.body.key_indicators, res);
});

module.exports = createPMSRoute;