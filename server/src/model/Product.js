const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        type: {
            type: String,
        },
        file: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]

    },
    {
        timestamps: true,
    }

)

const Product = mongoose.model('Product', productSchema)

module.exports = Product