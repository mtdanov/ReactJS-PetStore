const Message = require('../model/Message')

exports.create = (data) => Message.create(data)

exports.del = (id) => Message.findByIdAndDelete(id)

exports.getById = async (id) => {
    const messages = await Message.find({ owner: id })
    return messages
}

