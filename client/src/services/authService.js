import * as request from "../lib/request";

let baseUrl = "http://localhost:3010/user";

export const register = async (data) => {
  try {
    const result = await request.post(`${baseUrl}/register`, data);
    return result;
  } catch (error) {
    throw new Error(error.message);

  }
};

export const login = async (data) => {
  try {
    const result = await request.post(`${baseUrl}/login`, data);
    // console.log(result)
    return result;
  } catch (error) {
    throw new Error(error.message);

  }
};

export const logout = async () => {
  try {
    await request.get(`${baseUrl}/logout`)
  } catch (error) {
    throw new Error(error.message)
  }
}
