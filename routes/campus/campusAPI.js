const deleteCampusRoute = require('./deleteCampus');
const addDepartmentRoute = require('./addDepartment');
// const deleteDepartmentRoute = require('./deleteDepartment');
const getAllCampusRoute = require('./readCampus');
const addCampusWithDepartmentRoute = require('./addCampusWithDepartment');
const editDepartmentRoute = require('./editDepartment');

const campusAPI = require('express').Router();

campusAPI.use('/', getAllCampusRoute);


campusAPI.use('/addCampusWithDepartment', addCampusWithDepartmentRoute);
campusAPI.use('/deleteCampus', deleteCampusRoute);


// campusAPI.use('/add', addDepartmentRoute);
// campusAPI.use('/delete', deleteDepartmentRoute);
// campusAPI.use('/editDepartment', editDepartmentRoute);

module.exports = campusAPI;