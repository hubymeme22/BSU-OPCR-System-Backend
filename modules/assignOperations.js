const targetSetting = require('../models/targetSetting');
const campus = require('../models/campus');

// assigns the specific target scopes for the campus
module.exports.assignCampusTarget = async (targetCampus, targetIDs, res) => {
    const responseFormat = { assigned: false, error: null };

    try {
        const targets = await targetSetting.find({ _id: { $or: targetIDs }}).select('_id');
        const campusData = await campus.findOne({ campus: targetCampus });

        // assign these targets to the campus
        targets.forEach(target => {
            // append the id if the id is not yet on the list
            if (campusData.scope.indexOf(target._id) < 0)
                campusData.scope.push(target._id);
        });

        // save the target
        await campusData.save();
        responseFormat.assigned = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
}

module.exports.assignDepartmentTarget = async (targetCampus, targetDepartment, targetIDs, res) => {
    const responseFormat = { added: [], assigned: false, error: null };

    try {
        const campusData = await campus.findOne({$and: [{campus: targetCampus}, {department: targetDepartment}]}).populate('target_setting');
        const departmentIndex = campusData.department.findIndex(department => department.name == targetDepartment)

        // check for existence of campus
        if (campusData == null) {
            responseFormat.error = 'CannotFindCampusDepartment';
            return res.json(responseFormat);
        }

        // check for existence of department in campus
        // (not actually needed, but in case of bugs in schema searching)
        if (departmentIndex < 0) {
            responseFormat.error = 'DepartmentNotOnCampus';
            return res.json(responseFormat);
        }

        // reset the target of the department
        campusData.department[departmentIndex].opcr = [];
        targetIDs.forEach(id => {
            // makes sure that the target is included in scope of the campus
            const targetObj = campusData.scope.find(item => item._id == id);
            if (!targetObj) return;

            // add additional parameter for rating performance,
            // remarks and comments
            targetObj.rating = 0;
            targetObj.remarks = '';
            targetObj.comment = '';

            // overwrite the targets of of the current department
            campusData.department[departmentIndex].opcr.push(targetObj);
            responseFormat.added.push(id);
        });

        await campusData.save();
        responseFormat.assigned = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
}