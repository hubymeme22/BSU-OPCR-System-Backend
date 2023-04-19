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
};

module.exports.specifiedPermissionCheck = (permission=[]) => {
    const permissionCheck = (req, res, next) => {
        const cookies = req.cookies;
        const missedParams = param.paramCheck(['token'], cookies);
    
        // req.allowedData not assigned
        if (missedParams.length > 0) next();
        try {
            const derivedInfo = jwt.verify(cookies.token, process.env.SECRETKEY);
            const userdata = derivedInfo.userdata;

            // checks if the permission of the user is allowed
            let allowed = true;
            permission.forEach(perm => {
                if (userdata.access.indexOf(perm) < 0)
                    return allowed = false;
            });

            if (!allowed) {
                req.allowedDataErr = false;
                next();
            }

            req.allowedData = derivedInfo;
            req.allowedDataErr = false;
            next();
        } catch(err) {
            req.allowedDataErr = true;
            next();
        }
    };

    return permissionCheck;
};