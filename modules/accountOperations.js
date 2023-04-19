const Accounts = require('../models/accounts');
const jwt = require('jsonwebtoken');

// for logging in an account
module.exports.login = async (user, pass, res) => {
    const responseFormat = {error: false, token: '', isLoggedIn: false};

    try {
        // username matching
        const userdata = await Accounts.findOne({ $or: [{username: user}, {email: user}] });
        if (userdata == null) {
            responseFormat.error = 'NonexistentAccount'
            return res.json(responseFormat);
        }

        // match the password provided
        if (userdata.password == pass) {
            responseFormat.isLoggedIn = true;
            userdata.password = 'secret';
            responseFormat.token = jwt.sign({userdata}, process.env.SECRETKEY);
            return res.json(responseFormat);
        }

        responseFormat.error = 'InvalidCredentials';
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// for registering an account
module.exports.register = async (userdetails, res) => {
    const responseFormat = {error: null, registered: false};
    const { username, email, password, name } = userdetails;

    try {
        const userdata = await Accounts.findOne({ $or: [{username: username}, {email: email}]});

        // makes sure that the username provided does not exist
        if (userdata == null) {
            const newAccount = new Accounts({
                username: username,
                email: email,
                password: password,
                name: name,
                access: ['review']
            });

            await newAccount.save();
            responseFormat.registered = true;
            return res.json(responseFormat);
        }

        // username already exists in the database
        responseFormat.error = 'UserAlreadyRegistered';
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// for registering an admin account
module.exports.registerAdminAccount = async (userdetails, res) => {
    const responseFormat = {error: null, registered: false};
    const { username, email, password, name } = userdetails;

    try {
        const userdata = await Accounts.findOne({ $or: [{username: username}, {email: email}]});

        // makes sure that the username provided does not exist
        if (userdata == null) {
            const newAccount = new Accounts({
                username: username,
                email: email,
                password: password,
                name: name,
                access: ['rating', 'form', 'comment']
            });

            await newAccount.save();
            responseFormat.registered = true;
            return res.json(responseFormat);
        }

        // username already exists in the database
        responseFormat.error = 'UserAlreadyRegistered';
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// for registering a commentor account
module.exports.registerCommentAccount = async (userdetails, res) => {
    const responseFormat = {error: null, registered: false};
    const { username, email, password, name } = userdetails;

    try {
        const userdata = await Accounts.findOne({ $or: [{username: username}, {email: email}]});

        // makes sure that the username provided does not exist
        if (userdata == null) {
            const newAccount = new Accounts({
                username: username,
                email: email,
                password: password,
                name: name,
                access: ['rating', 'comment']
            });

            await newAccount.save();
            responseFormat.registered = true;
            return res.json(responseFormat);
        }

        // username already exists in the database
        responseFormat.error = 'UserAlreadyRegistered';
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};

// for registering a user that can change the forms
module.exports.registerFormAccount = async (userdetails, res) => {
    const responseFormat = {error: null, registered: false};
    const { username, email, password, name } = userdetails;

    try {
        const userdata = await Accounts.findOne({ $or: [{username: username}, {email: email}]});

        // makes sure that the username provided does not exist
        if (userdata == null) {
            const newAccount = new Accounts({
                username: username,
                email: email,
                password: password,
                name: name,
                access: ['form']
            });

            await newAccount.save();
            responseFormat.registered = true;
            return res.json(responseFormat);
        }

        // username already exists in the database
        responseFormat.error = 'UserAlreadyRegistered';
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
};