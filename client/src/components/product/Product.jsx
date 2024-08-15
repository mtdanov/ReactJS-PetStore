import { Link } from "react-router-dom";

import { useContext } from "react";
import ProductsContext from "../../contexts/productContext";
import styles from './Product.module.css'

export default function Product({ _id, name, file, price, totalPrice }) {
    const { addProduct } = useContext(ProductsContext)

    const addToCart = (event, id) => {
        let product = { 'id': id, 'quantity': 1, 'price': price, name, file, totalPrice };
        addProduct(product);
    }
    return (
        <div className={styles.product}>
            <Link to={`/product/details/${_id}`}>
                <img className={styles.productImg} src={file} alt="" />
                <h1 className={styles.productTitle}> {name}</h1>
            </Link>
            <div className={styles.price}>{price.toFixed(2)}лв</div>
            <button onClick={(event) => { addToCart(event, _id) }} className={styles.buyBtn}>Добави</button>
        </div >
    )
}