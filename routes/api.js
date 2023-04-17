const apiRoute = require('express').Router();
const loginRoute = require('./accounts/login');
const registerRoute = require('./accounts/register');
const registerAdminRoute = require('./accounts/registerAdmin');
const registerCommentRoute = require('./accounts/registerComment');
const registerFormRoute = require('./accounts/registerForm');
const assignAPI = require('./assign/assignAPI');
const pmtAPI = require('./pmt/pmtAPI');

// for logging and account manipulation stuffs
apiRoute.use('/login', loginRoute);

// account registration
apiRoute.use('/register', registerRoute);
apiRoute.use('/register', registerAdminRoute);
apiRoute.use('/register', registerFormRoute);
apiRoute.use('/register', registerCommentRoute);

apiRoute.use('/pmt', pmtAPI);
apiRoute.use('/assign', assignAPI);

module.exports = apiRoute;