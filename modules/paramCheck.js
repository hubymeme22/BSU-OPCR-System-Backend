// returns the paramters that are not set on object/json
module.exports.paramCheck = (params, obj) => {
    const missedParams = [];
    params.forEach(param => {
        if (!obj[param] == undefined) {
            missedParams.push(param);
        }
    });
    return missedParams;
};