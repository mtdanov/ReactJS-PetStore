const Post = require('../model/Post')

exports.getAll = () => Post.find();

exports.getById = (postId) => Post.findById(postId)

exports.getLatest = () => Post.find().sort({ createdAt: -1 }).limit(7)

exports.del = (id) => Post.findByIdAndDelete(id)

exports.create = async (data) => {
    const post = await Post.create(data)
    return post
}

exports.getByIdEdit = async (productId) => {
    const post = await Post.findById(productId)
    const { name, description, age, breed, file } = post
    return { name, description, age, breed, file }
}

exports.editPost = async (id, { ...data }) => {
    const result = await Post.findByIdAndUpdate(id, data, { new: true })
    return result
}