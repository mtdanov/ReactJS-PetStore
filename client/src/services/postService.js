import * as request from "../lib/request";
const baseUrl = 'http://localhost:3010/animals'

export const getAllPosts = async () => {
    try {
        const result = await request.get(`${baseUrl}`)
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getPost = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/animal/${id}`)
        return result

    } catch (error) {
        throw new Error(error.message);

    }
}

export const getPostEdit = async (id) => {
    try {
        const result = await request.get(`http://localhost:3010/animals/animalEdit/${id}`)
        return result

    } catch (error) {
        throw new Error(error.message);

    }
}


export const createPost = async (data, userId) => {
    // console.log(data);
    try {
        const result = await request.post(`http://localhost:3010/animals/create/${userId}`, data)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const editPost = async (id, data) => {
    // console.log(id);
    // console.log(data);
    console.log(Object.fromEntries(data));

    try {
        const result = await request.put(`http://localhost:3010/animals/editPost/${id}`, data)
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const deletePost = async (id) => {
    // console.log(id);
    try {
        const result = await request.remove(`${baseUrl}/deletePost`, ({ id }))
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}