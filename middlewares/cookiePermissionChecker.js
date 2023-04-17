const jwt = require('jsonwebtoken');
const param = require('../modules/paramCheck');

module.exports.permissionCheck = (req, res, next) => {
    const cookies = req.cookies;
    const missedParams = param.paramCheck(['token'], cookies);

    // req.allowedData not assigned
    if (missedParams.length > 0) next();
    try {
        const derivedInfo = jwt.verify(cookies.token, process.env.SECRETKEY);
        req.allowedData = derivedInfo;
        req.allowedDataErr = false;
        next();
    } catch(err) {
        req.allowedDataErr = true;
        next();
    }
}