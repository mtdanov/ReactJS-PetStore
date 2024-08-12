const Comment = require('../model/Comment')
const Article = require('../model/Article')
const Product = require('../model/Product')

exports.create = async (type, data, id) => {
    if (type === 'article') {
        data.parentModel = 'Article'
        const comment = await Comment.create(data)
        await Article.findByIdAndUpdate(id, { $push: { comments: comment._id } })
        return comment

    } else if (type === 'product') {
        data.parentModel = 'Product'
        const comment = await Comment.create(data)
        await Product.findByIdAndUpdate(id, { $push: { comments: comment._id } })
        return comment
    }
}


exports.getComments = async (type, id) => {
    if (type === 'article') {
        const articleComments = await Article.findById(id).populate('comments')
        const comments = articleComments.comments
        return comments
    } else if (type === 'product') {
        const productComments = await Product.findById(id).populate('comments')
        const comments = productComments.comments
        return comments
    }
}

exports.getComment = (id) => Comment.findById(id)
exports.del = (id) => Comment.findByIdAndDelete(id)
exports.editComment = (id, comment) => Comment.findByIdAndUpdate(id, { comment }, { new: true })