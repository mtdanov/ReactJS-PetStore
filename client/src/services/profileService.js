import * as request from "../lib/request";
let baseUrl = "http://localhost:3010/user";

export const editProfile = async (id, data) => {
    console.log(id);
    console.log(data); 
    try {
        const result = await request.put(`${baseUrl}/profile/edit`, { id, data })
        // console.log(result);
        return result
    } catch (err) {
        console.log(err);
    }
}


export const getProfile = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/profile/` + id)
        // console.log(result);
        return result
    } catch (err) {
        console.log(err);
    }
}




