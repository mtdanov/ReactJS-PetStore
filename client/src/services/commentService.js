import * as request from '../lib/request'

export const createComment = async (typeId, username, comment, type) => {
    // console.log(type);
    try {
        const newComment = await request.post(`http://localhost:3010/comment/${type}/create/${typeId}`, { username, comment })
        // console.log(newComment);
        return newComment;
    } catch (error) {
        throw new Error(error.message);
    }
};



export const delComment = async (id) => {

    try {
        const result = await request.remove(`http://localhost:3010/comment/deleteComment/${id}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const getComment = async (id) => {
    try {
        const result = await request.get(`http://localhost:3010/comment/getComment/${id}`)
        // console.log(result)
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getAll = async (id, type) => {
    try {
        const result = await request.get(`http://localhost:3010/comment/${type}/getComments/${id}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const editComment = async (comment) => {
    try {
        const editedComment = await request.put(`http://localhost:3010/comment/editComment`, comment)
        // console.log(editedComment)
        return editedComment
    } catch (error) {
        throw new Error(error.message);

    }
}