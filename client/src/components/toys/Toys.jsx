import { useEffect, useState } from 'react'
import styles from './Toys.module.css'
import ProductsContext from '../../contexts/productContext'
import Product from '../product/Product'
import { useContext } from 'react'
import search from '../../../public/images/search.png'
import { useLocation } from 'react-router-dom'




export default function Toys() {
    const { dogToys, catToys } = useContext(ProductsContext);
    const location = useLocation().pathname.slice(1)
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);


    let products = ''
    if (location === 'dog-toys') {
        products = dogToys
    } else (
        products = catToys
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
        <section className={styles.ToysPage}>
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
        </section >
    )
}