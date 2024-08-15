const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require('../utils/tkn')

exports.register = async (userData) => {
    const user = await User.create(userData);

    const token = await generateToken(user)

    return { accessToken: token, email: user.email, role: user.role, id: user._id, name: user.name };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    const token = await generateToken(user)
    return { accessToken: token, _id: user._id, email: user.email, username: user.name, role: user.role }
};

exports.getUser = (userId) => User.findById(userId)

exports.editUser = async (id, data) => {
    const result = await User.findByIdAndUpdate(id, data, { new: true })
    return result
}

exports.getOrders = (userId) => User.findById(userId).populate('orders')