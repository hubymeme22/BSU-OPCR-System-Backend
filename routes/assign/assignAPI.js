const assignCampusPmt = require('./addCampusPMT');
const assignDepartmentPmt = require('./addDepartmentPMT');

const assignAPI = require('express').Router();

assignAPI.use('/campus', assignCampusPmt);
assignAPI.use('/department', assignDepartmentPmt);

module.exports = assignAPI;