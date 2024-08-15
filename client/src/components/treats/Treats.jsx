import styles from './Treats.module.css'
import ProductsContext from '../../context/ProductContext'
import Product from '../product/Product'
import { useContext, useEffect, useState } from 'react'
import search from '../../../public/images/search.png'
import { useLocation } from 'react-router-dom'

export default function Treats() {
    const { dogTreats, catTreats } = useContext(ProductsContext);
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation().pathname.slice(1)
    let products = ''
    if (location === 'dog-treats') {
        products = dogTreats
    } else (
        products = catTreats
    )

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    }
    const filterBySearch = (products, searchInput) => {
        if (!searchInput) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }

    useEffect(() => {
        let filtered = filterBySearch(products, searchInput);
        setFilteredProducts(filtered);
    }, [searchInput, products]);
    return (
        <section className={styles.TreatsPage}>
            <div className={styles.foodContainer}>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} onChange={handleSearchChange}
                        value={searchInput}
                        type="text"
                        placeholder='Search here' />
                    <img className={styles.searchIcon} src={search} alt="" />
                </div>
                <div className={styles.foodList}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <Product key={product._id} {...product} />
                        ))
                    ) : (
                        <div className={styles.notFound}>
                            Няма намерени продукти
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}