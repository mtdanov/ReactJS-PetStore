import * as request from '../lib/request'
const baseUrl = 'http://localhost:3010/contactUs'

export const createMessage = async (data) => {
    console.log(data);
    
    try {
        const result = await request.post(`${baseUrl}/createContact`, data)

    } catch (error) {
        throw new Error(error.message);

    }
}

export const getMessages = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/getContact`)
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}