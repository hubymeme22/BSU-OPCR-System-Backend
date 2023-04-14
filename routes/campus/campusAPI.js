const addCampusRoute = require('./addCampus');
const deleteCampusRoute = require('./deleteCampus');
const addDepartmentRoute = require('./addDepartment');
const deleteDepartmentRoute = require('./deleteDepartment');

const campusAPI = require('express').Router();

campusAPI.use('./add', addCampusRoute)
campusAPI.use('./delete', deleteCampusRoute)

campusAPI.use('./add', addDepartmentRoute)
campusAPI.use('./delete', deleteDepartmentRoute)

module.exports = campusAPI;