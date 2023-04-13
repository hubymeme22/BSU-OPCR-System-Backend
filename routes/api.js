const apiRoute = require('express').Router();
const loginRoute = require('./accounts/login');
const registerRoute = require('./accounts/register');
const pmtAPI = require('./pmt/pmtAPI');

// for logging and account manipulation stuffs
apiRoute.use('/login', loginRoute);
apiRoute.use('/register', registerRoute);
apiRoute.use('/pmt', pmtAPI);

module.exports = apiRoute;