const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSch = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', revSch);