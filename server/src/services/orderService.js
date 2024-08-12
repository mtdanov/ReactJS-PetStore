const Order = require('../model/Order')
const User = require('../model/User');


exports.getOrders = async (id) => {
    const orders = await Order.find({ userId: id })
    return orders
}
exports.getOrder = async (id) => {
    const order = await Order.findById({ _id: id })

    return order
}

exports.create = async (data, userId) => {

    const order = data.map(item => ({
        name: item.name,
        price: item.price,
        file: item.file,
        quantity: item.quantity
    }));
    const createdOrder = await Order.create({ userId, order })
    await User.findByIdAndUpdate(userId, { $push: { orders: createdOrder._id } })
    return createdOrder
}