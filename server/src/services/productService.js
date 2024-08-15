const Product = require('../model/Product')
const Category = require('../model/Category')

exports.getAll = () => Product.find();

exports.getById = (productId) => Product.findById(productId)

exports.getByIdEdit = async (productId) => {
    const product = await Product.findById(productId)
    const { name, description, price, category, type, file } = product
    return { name, description, price, category, type, file }
}

exports.getFood = async (category) => {
    const result = await Category.findOne({ name: category }).populate('products')
    return result.products
}
exports.getLatest = () => Product.find().sort({ createdAt: -1 }).limit(8)

exports.del = (id) => Product.findByIdAndDelete(id)

exports.create = async (data) => {
    const product = await Product.create(data)
    await Category.findByIdAndUpdate(data.category, { $push: { products: product._id } })
    return product
}

exports.editProduct = async (id, { name, description, category, type, file, price, file: imageUrl }) => {
    const categoryId = await Category.findOne({ name: category })
    if (categoryId) {
        const catId = categoryId._id
        category = catId
    }
    const result = await Product.findByIdAndUpdate(id, { name, description, category, type, file, price, file: imageUrl }, { new: true })
    return result
} 
