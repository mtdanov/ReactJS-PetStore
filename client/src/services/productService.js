import * as request from "../lib/request";
const baseUrl = 'http://localhost:3010/products'

export const createProduct = async (productData) => {

    try {
        const result = await request.post('http://localhost:3010/products/create', productData);
        return result;
    } catch (error) {
        throw new Error(error.message);

    }
};

export const getAll = async () => {
    try {
        const result = await request.get(`${baseUrl}`);
        // console.log(result);
        return result;
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getAllFiltred = async () => {
    try {
        const result = await request.get(`${baseUrl}/filteredProducts`);
        // console.log(result);
        return result;
    } catch (error) {
        throw new Error(error.message);

    }
}



export const getByCategory = async (categoryName) => {
    try {
        const result = await request.get(`${baseUrl}/getCategory?category=${categoryName}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getById = async (id) => {
    try {
        const result = await request.get(`${baseUrl}/productEdit/${id}`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const getOne = async (id) => {

    try {
        const result = await request.get(`${baseUrl}/product/${id}`)
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}

export const getLatestProducts = async () => {
    try {
        const result = await request.get(`${baseUrl}/latestProducts`)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const editProduct = async (id, data) => {
    try {
        const result = await request.put(`http://localhost:3010/products/editProduct/${id}`, data)
        // console.log(result);
        return result
    } catch (error) {
        throw new Error(error.message);

    }
}


export const deleteProduct = async (id) => {
    try {
        const result = await request.remove(`http://localhost:3010/products/deleteProduct/${id}`)
        // console.log(result);
    } catch (error) {
        throw new Error(error.message);

    }
}
