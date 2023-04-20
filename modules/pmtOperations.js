const Campus = require('../models/campus');
const TargetSetting = require('../models/targetSetting');

// for adding a new project/target
module.exports.setTarget = async (target, keyIndicators, res) => {
    const responseFormat = { added: false, summary: {}, error: null };
    try {
        // checks if the target already exist (append the keyIndicators to this)
        const targetCheck = await TargetSetting.findOne({ finalOutput: target });
        if (targetCheck == null) {
            // filters the keyIndicators that passed
            const passedKeyIndicators = [];
            keyIndicators.forEach(keySuccess => {
                if (keySuccess.key && keySuccess.success)
                    passedKeyIndicators.push({ key: keySuccess.key, successIndicator: keySuccess.success });
            });
    
            const newTarget = new TargetSetting({
                finalOutput: target,
                keyResult: passedKeyIndicators
            });
    
            const savedTarget = await newTarget.save();
            responseFormat.added = true;
            responseFormat.summary = savedTarget;
            return res.json(responseFormat);
        }
    
        // append the new key results to the existing target
        const keyIndicatorsCopy = targetCheck.keyResult;
        keyIndicators.forEach(keySuccess => {
            const match = keyIndicatorsCopy.find(item => { item.key == keySuccess.key });
            if (keySuccess.key && keySuccess.success && !match)
                targetCheck.keyResult.push({ key: keySuccess.key, successIndicator: keySuccess.success });
        });

        const newTargetCheck = await targetCheck.save();
        responseFormat.added = true;
        responseFormat.summary = newTargetCheck;
        res.json(responseFormat);
    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// retrieves and returns all the list of pmt
module.exports.getTargets = async (res) => {
    const responseFormat = { pmt: [], error: null };
    try {
        const pmtList = await TargetSetting.find();
        responseFormat.pmt = pmtList;
        res.json(responseFormat);
    } catch(err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// retrieves and returns the list of pmt of the campus
module.exports.getCampusTargets = async (campusName, res) => {
    const responseFormat = { pmt: [], error: null };
    try {
        const pmtList = await Campus.findOne({ campus: campusName }).populate({path: 'scope', model: 'target_settings'});
        if (pmtList == null) throw 'NonexistentCampus';

        responseFormat.pmt = pmtList.scope ? pmtList.scope : [];
        res.json(responseFormat);
    } catch(err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// uses the id to edit the contents of the target
module.exports.editTargets = async (targetID, details, res) => {
    const responseFormat = { edited: false, error: null };
    try {
        const target = await TargetSetting.findOne({ _id: targetID });
        if (target == null) throw 'NonexistentID';

        // overwrite the contents
        target.finalOutput = details.finalOutput;
        target.keyResult = [];

        details.keyResult.forEach(keySuccess => {
            target.keyResult.push(keySuccess);
        });

        await target.save();

        // send response
        responseFormat.edited = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};