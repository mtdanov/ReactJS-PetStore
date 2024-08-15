const Article = require('../model/Article');

exports.getAll = () => Article.find();

exports.getById = (articleId) => Article.findById(articleId)

exports.getLatest = () => Article.find().sort({ createdAt: -1 }).limit(3)

exports.del = (id) => Article.findByIdAndDelete(id)

exports.create = (data) => Article.create(data)

exports.getByIdEdit = async (articleId) => {
    const article = await Article.findById(articleId)
    const { title, description, file } = article
    return { title, description, file }
}

exports.editArticle = async (id, { ...data }) => {
    const result = await Article.findByIdAndUpdate(id, data)
    return result
}  
