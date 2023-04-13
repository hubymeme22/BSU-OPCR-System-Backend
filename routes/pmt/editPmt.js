const { paramCheck } = require('../../modules/paramCheck');
const routeOp = require('../../modules/pmtOperations');
const editPmtRoute = require('express').Router();

// edits the contents of a target by the use of its id
editPmtRoute.post('/:id', (req, res) => {
    const responseFormat = { edited: false, error: null };
    let missedParams = paramCheck(['target', 'key_result'], req.body);
    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    missedParams = [];
    req.key_result.forEach((keySuccess, index) => {
        if (!keySuccess.key || !keySuccess.success)
            missedParams.push(`${index} (key/success)`);
    });

    if (missedParams.length > 0) {
        responseFormat.error = `MissedParams=${missedParams}`;
        return res.json(responseFormat);
    }

    const finalizedFormat = { finalOutput: req.body.target, keyResult: req.body.key_result };
    routeOp.editTargets(req.params.id, finalizedFormat, res);
});

module.exports = editPmtRoute;