const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {

        title: {
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
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

    },
    {
        timestamps: true,
    }

)


const Article = mongoose.model('Article', articleSchema)

module.exports = Article