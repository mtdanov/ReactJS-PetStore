const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

const Post = mongoose.model('Post', postSchema)

module.exports = Post