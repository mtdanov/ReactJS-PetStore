import * as request from '../lib/request'

const baseUrl = 'http://localhost:3010/message'

export const createMessage = async (data) => {
    try {
        const result = await request.post(`${baseUrl}/createMessage`, data)
        // console.log(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getMessages = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/getMessages/${id}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const deleteMessage = async (id) => {
    try {
        const result = await request.remove(`${baseUrl}/deleteMessage/${id}`)
    } catch (error) {
        throw new Error(error.message);
    }
}


