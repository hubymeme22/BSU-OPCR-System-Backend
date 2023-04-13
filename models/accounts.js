const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accounts = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        middle: {
            type: String,
        },
        last: {
            type: String,
            required: true
        },
        extension: {
            type: String,
        }
    }
});

module.exports = mongoose.model('accounts', accounts);