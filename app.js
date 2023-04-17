const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();
const serverIP = process.env.IP;
const serverPort = process.env.PORT;
const mongooseURI = process.env.MONGODBURI;

// api operations
const apiRoute = require('./routes/api');
app.use(cookieParser());
app.use(express.json());
app.use('/api', apiRoute);

mongoose.set('strictQuery', true);
mongoose.connect(mongooseURI)
    .then(() => {
        console.log('[+] Connected to database!');
        app.listen(serverPort, serverIP, () => {
            console.log(`[+] Server started at: http://${serverIP}:${serverPort}/`);
        });
    })
    .catch((error) => {
        console.log('[-] An error occured!');
        console.log(error);
    });
