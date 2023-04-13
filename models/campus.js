const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campus = new Schema({
    campus: {
        type: String,
        required: true
    },
    department: {
        type: [{
            name: {
                type: String,
                required: true
            },
            assignedTo: {
                type: String,
                required: true
            },
            opcr: {
                type: Object,
                required: true
            }
        }],
        required: true
    },
});

module.exports = mongoose.model('campus', campus);