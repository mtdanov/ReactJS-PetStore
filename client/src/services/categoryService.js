import * as request from '../lib/request'

export const createCategory = async (category) => {
    try {
        await request.post('http://localhost:3010/category/createCategory', category)

    } catch (error) {
        throw new Error(error.message);

    }
}

export const getCategories = async () => {
    try {
        const result = await request.get('http://localhost:3010/category/getCategories')
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}