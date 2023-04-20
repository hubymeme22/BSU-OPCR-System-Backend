const jwt = require('jsonwebtoken');
const param = require('../modules/paramCheck');

module.exports.permissionCheck = (req, res, next) => {
    const cookies = req.cookies;
    const missedParams = param.paramCheck(['token'], cookies);

    // req.allowedData not assigned
    if (missedParams.length > 0) {
        req.allowedDataErr = true;
        return next();
    }

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

// specifies all the permission the user must have
module.exports.specifiedPermissionCheck = (permission=[]) => {
    const permissionCheck = (req, res, next) => {
        const cookies = req.cookies;
        const missedParams = param.paramCheck(['token'], cookies);

        // req.allowedData not assigned
        if (missedParams.length > 0) {
            req.allowedDataErr = true;
            return next();
        }

        try {
            const derivedInfo = jwt.verify(cookies.token, process.env.SECRETKEY);
            const userdata = derivedInfo.userdata;

            // additional checking to avoid bruteforing token for empty permission
            let tokenAllowed = true;
            for (let i = 0; i < userdata.access.length; i++) {
                let matched = false;
                for (let j = 0; j < permission.length; j++) {
                    if (userdata.access[i] == permission[j]) {
                        matched = true;
                        break;
                    }
                }

                if (!matched) {
                    tokenAllowed = false;
                    break;
                }
            }

            if (!tokenAllowed) {
                req.allowedDataErr = false;
                return next();
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

// specifies all the permission the user can have
module.exports.allowPermission = (permission=[]) => {
    const permissionCheck = (req, res, next) => {
        const cookies = req.cookies;
        const missedParams = param.paramCheck(['token'], cookies);

        if (missedParams.length > 0) {
            req.allowedDataErr = true;
            return next();
        }

        try {
            const derivedInfo = jwt.verify(cookies.token, process.env.SECRETKEY);
            const userdata = derivedInfo.userdata;

            let tokenAllowed = false;
            for (let i = 0; i < userdata.access.length; i++) {
                // checks if one of the permission matched
                let matched = false;
                for (let j = 0; j < permission.length; j++) {
                    if (userdata.access[i] == permission[j]) {
                        matched = true;
                        tokenAllowed = true;
                        break;
                    }

                    if (matched) break;
                }
            }

            if (!tokenAllowed) {
                req.allowedDataErr = true;
                return next();
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

// a simple error generation function that will be called
// when cookies are being checked
module.exports.permissionErrGen = (jsonFormat) => {
    jsonFormat.error = 'InsufficientPermission';
    const middleware = (req, res, next) => {
        if (req.allowedDataErr)
            return res.json(jsonFormat);
        next();
    }
    return middleware;
}