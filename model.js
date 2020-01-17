const mongoose = require('mongoose');

var ContentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    }
});
const contentModel = mongoose.model('Content', ContentSchema);

module.exports = contentModel;