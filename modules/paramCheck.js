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


// returns the paramters that are not set in array
// assuming that the elements of array will be object
module.exports.arrayParamChecker = (params, arr) => {
    const missedParams = [];
    arr.forEach(obj => {
        const missed = module.exports.paramCheck(params, obj);
        if (missed.length > 0)
            missedParams.push(missed);
    });
    return missedParams;
};