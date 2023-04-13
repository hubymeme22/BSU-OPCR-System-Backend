const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const targetSetting = new Schema({
    finalOutput: {
        type: String,
        required: true
    },
    keyResult: {
        type: [{
            key: {
                type: String,
                required: true
            },
            successIndicator: {
                type: String,
                required: true
            }
        }],
        required: true
    },
});

module.exports = mongoose.model('target_setting', targetSetting);