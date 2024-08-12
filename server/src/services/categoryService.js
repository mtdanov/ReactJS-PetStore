const Category = require('../model/Category')


exports.create = async (name) => {

    await Category.create(name)

}

exports.getCategories = async () => {

    const result = await Category.find()

    const data = result.map(category => ({
        id: category._id,
        name: category.name
    }));

    return data
}

// exports.getById = (id) => Category.findById(id)