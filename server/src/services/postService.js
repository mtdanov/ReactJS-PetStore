const Post = require('../model/Post')

// exports.editPost = (id, { ...data }) => Post.findByIdAndUpdate(id, data)
exports.getAll = () => Post.find();
exports.getById = (postId) => Post.findById(postId)
exports.getLatest = () => Post.find().sort({ createdAt: -1 }).limit(7)
exports.del = (id) => Post.findByIdAndDelete(id)
exports.create = async (data) => {
    console.log(data); 
    const post = await Post.create(data)
    return post
}
// exports.editPost = (id, { ...data }) => Post.findByIdAndUpdate(id, data)

exports.getByIdEdit = async (productId) => {
    const post = await Post.findById(productId)
    const { name, description, age, breed, file } = post
    return { name, description, age, breed, file }
}
exports.editPost = async (id, { ...data }) => {
    const result = await Post.findByIdAndUpdate(id, data, { new: true })
    console.log(result);
    return result
}