import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as orderService from '../../services/orderService'
import ProductsContext from "../../contexts/productContext";
import AuthContext from "../../contexts/authContext";

import "./Cart.css";


export default function Cart() {
    const navigate = useNavigate()
    const { userId } = useContext(AuthContext)
    const { cart, removeProduct, setQuantity, clearCart, } = useContext(ProductsContext)

    const [cartProducts, setProductsCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    const createOrder = (e) => {
        e.preventDefault()
        orderService.createOrder(userId, cartProducts).then(result => console.log(result)).catch(error => console.log(error))
        clearCart()
        navigate('/thank-you')
    }

    const removeProductHandler = (id) => {
        removeProduct(id)
    }

    const sumCartProductsPrice = () => {
        let sum = 0;
        cartProducts.forEach((p) => {
            sum += p.price * p.quantity
        });
        setTotalPrice(sum);
    }

    const changeQuantity = (e, id) => {
        setQuantity(id, Number(e.target.value))
    }

    useEffect(() => {
        setProductsCart(cart)
    }, [cart])

    useEffect(() => {
        sumCartProductsPrice();
    }, [cartProducts])

    return (
        <section className="cart-page">
            <div className="cart">
                {cartProducts.length == 0 ? (
                    <div className='empty'>Чантата е празна!</div>
                ) : (
                    cartProducts.map(({ id, name, file, price, quantity, totalPrice }) => (
                        <div className='cart-product' key={id}>
                            <img className='cart-pic' src={file} alt={name} />
                            <div className='cart-product-details'>
                                <div className='cart-product-name'>{name}</div>
                                <div className='cart-product-quantity'>
                                    <label className='cart-product-quantity-label' htmlFor='quantity'>Брой:</label>
                                    <input
                                        className='cart-product-quantity-input'
                                        type="number"
                                        name='quantity'
                                        value={quantity}
                                        onChange={(e) => { changeQuantity(e, id) }}
                                    />
                                </div>
                            </div>
                            <div className='cart-product-price'>{(totalPrice || price).toFixed(2)} лв.</div>
                            <button className='remove-btn' onClick={() => { removeProductHandler(id) }}>X</button>
                        </div>
                    ))
                )}
                {cartProducts.length > 0 && (
                    <div className='shopping-cart-summary'>
                        <div className='total-price'>Общо: {totalPrice.toFixed(2)} лв.</div>
                        <button className='cart-btn' onClick={createOrder}>Завърши поръчката</button>
                    </div>
                )}
            </div>
        </section>
    );
};

