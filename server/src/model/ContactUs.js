const mongoose = require('mongoose')

const contactUsSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },

        text: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }

)

const ContactUs = mongoose.model('ContactUs', contactUsSchema)

module.exports = ContactUs