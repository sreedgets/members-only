const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String, required: true},
        datePosted: {type: String, required: true},
        /* datePosted: {type: Date, required: true}, */
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        text: {type: String, minLength: 1}
    }
);

module.exports = mongoose.model('Post', PostSchema);