import * as request from "../lib/request";

export const createOrder = async (userId, cartProducts) => {
    // console.log(order);
    try {
        const result = await request.post(`http://localhost:3010/order/create/${userId}`, cartProducts)
        // console.log(order);
        return result;
    } catch (error) {
        throw new Error(error.message);

    }
};


export const getOrders = async (userId) => {
    // console.log(orderId);
    try {
        const result = await request.get(`http://localhost:3010/order/orders/${userId}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getOrder = async (orderId) => {
    // console.log(orderId);
    try {
        const result = await request.get(`http://localhost:3010/order/getOrder/${orderId}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}