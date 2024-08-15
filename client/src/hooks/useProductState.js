/// !!! fix category 
export const addProductState = (newProduct, setProducts, setDogFood, setDogToys, setDogTreats, setCatFood, setCatToys, setCatTreats) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    switch (newProduct.category) {
        // dog-food
        case '66b5c79c2420be27d6676e4c':
            setDogFood((prevProducts) => [...prevProducts, newProduct]);
            break;
        //dog-toys
        case '66b708fb520deb89fd9d8ff6':
            setDogToys((prevProducts) => [...prevProducts, newProduct]);
            break;
        //dog-treats
        case '66b6fd4a520deb89fd9d8fc7':
            setDogTreats((prevProducts) => [...prevProducts, newProduct]);
            break;
        //cat-food
        case '66b63ff42813b0798ef18f69':
            setCatFood((prevProducts) => [...prevProducts, newProduct]);
            break;
        //cat-toys
        case '66b70c85520deb89fd9d9011':
            setCatToys((prevProducts) => [...prevProducts, newProduct]);
            break;
        //cat-treats
        case '66b70946520deb89fd9d8ff8':
            setCatTreats((prevProducts) => [...prevProducts, newProduct]);
            break;
        default:
            break;
    }
};

export const updateProductState = (updatedProduct, setProducts, setDogFood, setDogToys, setDogTreats, setCatFood, setCatToys, setCatTreats) => {
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
        )
    );
    switch (updatedProduct.category) {
        // dog-food
        case '66b5c79c2420be27d6676e4c':
            setDogFood((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            break;
        //dog-toys
        case '66b708fb520deb89fd9d8ff6':
            setDogToys((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            break;
        // dog-treats
        case ' 66b6fd4a520deb89fd9d8fc7':
            setDogTreats((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            break;
        //cat-food
        case '66b63ff42813b0798ef18f69':
            setCatFood((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            break;
        //cat-toys
        case '66b70c85520deb89fd9d9011':
            setCatToys((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            break;
        //cat-treats
        case '66b70946520deb89fd9d8ff8':
            setCatTreats((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
            break;
        default:
            break;
    }
};

export const deleteProductState = (category, id, setDogFood, setDogToys, setDogTreats, setCatFood, setCatToys, setCatTreats) => {
    switch (category) {
        // dog-food
        case '66b5c79c2420be27d6676e4c':
            setDogFood((prevProducts) => prevProducts.filter((product) => product._id !== id))
            break;
        //dog-toys
        case '66b708fb520deb89fd9d8ff6':
            setDogToys((prevProducts) => prevProducts.filter((product) => product._id !== id));
            break;
        // dog-treats
        case ' 66b6fd4a520deb89fd9d8fc7':
            setDogTreats((prevProducts) => prevProducts.filter((product) => product._id !== id));
            break;
        //cat-food
        case '66b63ff42813b0798ef18f69':
            setCatFood((prevProducts) => prevProducts.filter((product) => product._id !== id));
            break;
        //cat-toys
        case '66b70c85520deb89fd9d9011':
            setCatToys((prevProducts) => prevProducts.filter((product) => product._id !== id));
            break;
        //cat-treats
        case '66b70946520deb89fd9d8ff8':
            setCatTreats((prevProducts) => prevProducts.filter((product) => product._id !== id));
            break;
        default:
            break;
    }
};