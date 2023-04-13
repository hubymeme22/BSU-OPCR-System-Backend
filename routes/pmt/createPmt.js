const routeOp = require('../../modules/pmtOperations');
const params = require('../../modules/paramCheck');
const createPMSRoute = require('express').Router();

createPMSRoute.post('/', (req, res) => {
    // initialize missed parameter response
    let missedParams = params.paramCheck(['target', 'key_indicators'], req.body);
    const responseFormat = { added: false, summary: {}, error: null };

    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    // another check for confirming the format of each key_indicators
    missedParams = ['key_indicators'];
    req.body.key_indicators.forEach((keySuccess, index) => {
        if (!keySuccess.key || keySuccess.success)
            missedParams.push(`${index}(key/success)`);
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