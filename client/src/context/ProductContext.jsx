import React, { createContext, useEffect, useState } from 'react'
import * as productService from '../services/productService'
import { addProductState, updateProductState, deleteProductState } from '../hooks/useProductState'


const ProductsContext = createContext();
ProductsContext.displayName = 'ProductsContext'


export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const [dogFood, setDogFood] = useState([])
    const [dogToys, setDogToys] = useState([])
    const [dogTreats, setDogTreats] = useState([])

    const [catFood, setCatFood] = useState([])
    const [catToys, setCatToys] = useState([])
    const [catTreats, setCatTreats] = useState([])

    const [isloading, setloading] = useState(false)



    const removeProduct = (id) => {
        const remainedProducts = cart.filter((product) => {
            return product.id != id
        })
        setCart(remainedProducts)
    }


    const addProduct = (product) => {
        let isProductInCart = cart.filter((p) => {
            return p.id === product.id
        })

        if (isProductInCart.length > 0) {
            setCart((prevProducts) => {
                const result = prevProducts.map((p) => {
                    if (p.id === product.id) {
                        const quantity = p.quantity + product.quantity
                        const price = p.price + product.price
                        return { ...p, quantity: quantity, price }
                    }
                    return p
                })
                return result
            })
        } else {
            setCart((prevProducts) => {
                return [...prevProducts, product];
            });
        }
    }

    const setQuantity = (id, newquantity) => {
        if (newquantity != 0) {
            setCart((prevProducts) => {
                const result = prevProducts.map((p) => {
                    if (p.id === id) {
                        const quantity = (newquantity)
                        const totalPrice = p.price * quantity

                        return { ...p, quantity: quantity, totalPrice: totalPrice }
                    }
                    return p;
                })
                return result
            })
        } else {
            removeProduct(id)
        }
    }

    const clearCart = () => {
        setCart([])
    }


    const handleAddProductState = (newProduct) => {
        console.log(newProduct);

        addProductState(newProduct, setProducts, setDogFood, setDogToys, setDogTreats, setCatFood, setCatToys, setCatTreats);
    };

    const handleUpdateProductState = (updatedProduct) => {
        updateProductState(updatedProduct, setProducts, setDogFood, setDogToys, setDogTreats, setCatFood, setCatToys, setCatTreats);
    };

    const handleDeleteProductState = (id) => {
        deleteProductState(id, setProducts, setDogFood, setDogToys, setDogTreats, setCatFood, setCatToys, setCatTreats);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dogFood = await productService.getByCategory('dog-food');
                const dogToys = await productService.getByCategory('dog-toys');
                const dogTreats = await productService.getByCategory('dog-treats');
                const catFood = await productService.getByCategory('cat-food');
                const catToys = await productService.getByCategory('cat-toys');
                const catTreats = await productService.getByCategory('cat-treats');

                setDogFood(dogFood);
                setDogToys(dogToys);
                setDogTreats(dogTreats);
                setCatFood(catFood);
                setCatToys(catToys);
                setCatTreats(catTreats);
                setloading(true)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    // useEffect(() => {
    //     productService.getAll().then(result => setProducts(result)).catch(err => console.log(err))
    // }, [])

    const productsValues = {
        products,
        dogFood,
        dogToys,
        dogTreats,
        catFood,
        catToys,
        catTreats,
        cart,
        handleAddProductState,
        handleDeleteProductState,
        handleUpdateProductState,
        addProduct,
        removeProduct,
        setQuantity,
        clearCart,
        isloading,
    }

    return (
        <ProductsContext.Provider value={productsValues}>
            {children}
        </ProductsContext.Provider>
    )
}


export default ProductsContext;
