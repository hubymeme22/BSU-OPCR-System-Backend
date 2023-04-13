const createPmtRoute = require('./createPmt');
const readPmtRoute = require('./readPmt');
const editPmtRoute = require('./editPmt');

const pmtAPI = require('express').Router();

pmtAPI.use('/create', createPmtRoute);
pmtAPI.use('/update', editPmtRoute);
pmtAPI.use('/', readPmtRoute);

module.exports = pmtAPI;