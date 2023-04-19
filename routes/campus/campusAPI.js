const addCampusRoute = require('./addCampus');
const deleteCampusRoute = require('./deleteCampus');
const addDepartmentRoute = require('./addDepartment');
const deleteDepartmentRoute = require('./deleteDepartment');
const getAllCampusRoute = require('./readCampus');

const campusAPI = require('express').Router();

campusAPI.use('/', getAllCampusRoute)

campusAPI.use('/addCampus', addCampusRoute)
campusAPI.use('/deleteCampus', deleteCampusRoute)

// campusAPI.use('/add', addDepartmentRoute)
// campusAPI.use('/delete', deleteDepartmentRoute)

module.exports = campusAPI;