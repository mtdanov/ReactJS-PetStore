const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String, require: true
    },
    username: {
        type: String, require: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'parentModel'
    },
    parentModel: {
        type: String,
        required: true,
        enum: ['Article', 'Product']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment

// email: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
// },