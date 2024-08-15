import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import * as productService from '../../../services/productService'
import AuthContext from '../../../context/AuthContext';
import ProductsContext from '../../../context/ProductContext';
import Comments from '../../comments/Comments';
import useDelete from '../../../hooks/useDelete';
import styles from './productDetails.module.css'


export default function ProductDetails() {
    const { role, username } = useContext(AuthContext)
    const { addProduct } = useContext(ProductsContext)
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [productCount, setProductCount] = useState('1')

    const { onDelete } = useDelete();

    const onChangeProductCount = (e) => {
        setProductCount(e.target.value);
    }

    const addToCart = (event, id) => {
        let product = { 'id': id, 'quantity': Number(productCount) };
        addProduct(product);
    }


    useEffect(() => {
        productService.getOne(productId).then(result => setProduct(result)).catch(error => console.log(error))

    }, [productId])

    return (

        <section className={styles.productDetailsPage}>
            <div className={styles.product}>
                <div className={styles.productDetails}>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <img className={styles.detailsPic} src={product.file} alt="" />
                    <div className={styles.info}>Описание:
                        <div className={styles.description}>{product.description}</div>
                    </div>
                    <div className={styles.quantityWrap}>
                        <label className={styles.quantityLabel} htmlFor="quantity">Брой:</label>
                        <input className={styles.quantity} type="number" id='quantity' name='quantity' min={1} value={productCount} onChange={onChangeProductCount} />
                    </div>
                    <div className={styles.price}>${product.price?.toFixed(2)}</div>
                    <div className={styles.btnWrap}>
                        <button className={styles.buyBtn} onClick={(event) => addToCart(event, product._id)}>Купи</button>
                    </div>
                    {role === 'admin' &&
                        <div className={styles.adminBtns}>
                            <Link className={styles.editBtn} to={`/edit-product/${product._id}`}>Edit</Link>
                            <button className={styles.deleteBtn} onClick={() => onDelete(product._id, 'product', product.category)}>Delete</button>
                        </div>
                    }
                </div>
                <Comments id={productId} username={username} type='product' />
            </div>
        </section>
    )
}
