import * as request from '../lib/request'
const baseUrl = 'http://localhost:3010/articles'

export const getAll = async () => {
    try {
        const result = await request.get(`${baseUrl}`);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getOne = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/article/${id}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getById = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/articleEdit/${id}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const createArticle = async (data) => {
    try {
        const result = await request.post(`http://localhost:3010/articles/create`, data)
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const deleteArticle = async (id) => {
    try {
        const result = await request.remove(`${baseUrl}/deleteArticle/${id}`)
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getLatestArticles = async () => {
    try {
        const result = await request.get(`${baseUrl}/latestArticles`)
        return result
    } catch (error) {
        console.log(error)
        throw new Error(error.message);

    }
}
export const editArticle = async (id, data) => {
    try {
        const result = await request.put(`http://localhost:3010/articles/editArticle/${id}`, data)
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}
