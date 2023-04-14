const Campus = require('../models/campus');

// for adding a new campus/department
module.exports.addCampus = async (campusName, departmentName, assignedTo, opcr, res) => {
    const responseFormat = { added: false, summary: {}, error: null };
    try {
        // checks if the campus already exists
        const campusCheck = await Campus.findOne({ campus: campusName });
        if (campusCheck == null) {
            const newCampus = new Campus({
                campus: campusName,
                department: [{ name: departmentName, assignedTo: assignedTo, opcr: opcr }]
            });
    
            const savedCampus = await newCampus.save();
            responseFormat.added = true;
            responseFormat.summary = savedCampus;
            return res.json(responseFormat);
        }
    
        // append the new department to the existing campus
        const departmentCopy = campusCheck.department;
        const match = departmentCopy.find(item => { item.name == departmentName });
        if (!match) {
            campusCheck.department.push({ name: departmentName, assignedTo: assignedTo, opcr: opcr });
            const newCampusCheck = await campusCheck.save();
            responseFormat.added = true;
            responseFormat.summary = newCampusCheck;
            res.json(responseFormat);
        } else {
            responseFormat.error = "Department already exists";
            res.json(responseFormat);
        }
    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// retrieves and returns all the list of campuses
module.exports.getCampuses = async (res) => {
    const responseFormat = { campuses: [], error: null };
    try {
        const campusList = await Campus.find();
        responseFormat.campuses = campusList;
        res.json(responseFormat);
    } catch(err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// uses the id to edit the contents of the campus/department
module.exports.editDepartment = async (campusID, departmentName, assignedTo, opcr, res) => {
    const responseFormat = { edited: false, error: null };
    try {
        const campus = await Campus.findOne({ _id: campusID });
        if (campus == null) {
            responseFormat.error = 'NonexistentID';
            return res.json(responseFormat);
        }

        // overwrite the contents
        const department = campus.department.find(item => { item.name == departmentName });
        if (department) {
            department.assignedTo = assignedTo;
            department.opcr = opcr;
            await campus.save();
            responseFormat.edited = true;
            res.json(responseFormat);
        } else {
            responseFormat.error = "Department not found";
            res.json(responseFormat);
        }

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};
