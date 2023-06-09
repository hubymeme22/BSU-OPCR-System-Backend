const Campus = require('../models/campus');

// for adding a new campus/department
module.exports.addCampusWithDepartments = async (campusName, departments, res) => {
    const responseFormat = { added: false, summary: {}, error: null };
    try {
        // checks if the campus already exists
        const campusCheck = await Campus.findOne({ campus: campusName });
        if (campusCheck == null) {
            const newCampus = new Campus({
                campus: campusName,
                department: departments
            });

            const savedCampus = await newCampus.save();
            responseFormat.added = true;
            responseFormat.summary = savedCampus;
            return res.json(responseFormat);
        }

        responseFormat.error = "Campus already exist."
        res.json(responseFormat)
    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
}

// retrieves and returns all the list of campuses
module.exports.getCampuses = async (res) => {
    const responseFormat = { campuses: [], error: null};
    try {
        const campusList = await Campus.find();
        responseFormat.campuses = campusList;
        res.json(responseFormat);
    } catch(err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

module.exports.deleteCampus = async(campusID, res) => {
    const responseFormat = {deleted: false, error: null, updated:[]}
    try{
        const deletedCampus = await Campus.findByIdAndDelete({ _id: campusID});
        if (!deletedCampus) {
            responseFormat.deleted = false;
            res.json(responseFormat);
        } else {
            responseFormat.deleted = true;
            responseFormat.updated = await Campus.find();
            await campus.save();
            res.json(responseFormat);
        }
    }catch (err){
        responseFormat.error = err;
        res.json(responseFormat);

    }
}

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

module.exports.deleteDepartment = async( campusName, departmentName, res) => {
    const responseFormat = {deleted: false, error: null}
    try{
        const campus = await Campus.findOne({ campus: campusName });
        if (!campus) {
            responseFormat.error = `Campus '${campusName}' not found.`;
            return res.json(responseFormat);
        }

        // Filter out the department that needs to be deleted
        campus.department = campus.department.filter(department => department.name !== departmentName);

        // Save the updated campus
        await campus.save();

        responseFormat.deleted = true;
        res.json(responseFormat);
    }catch (err){
        responseFormat.error = err;
        res.json(responseFormat);

    }
}
