const ContactUs = require('../model/ContactUs')

exports.create = (data) => ContactUs.create(data)
exports.getAll = () => ContactUs.find()