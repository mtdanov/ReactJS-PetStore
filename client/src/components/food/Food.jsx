import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import * as productService from '../../services/productService'
import ProductsContext from '../../context/ProductContext'
import Preloader from '../Preloader/Preloader'

import Product from '../Product/Product'
import styles from './Food.module.css'
import search from '../../../public/images/search.png'


export default function Food() {
    const { dogFood, catFood, isloading, } = useContext(ProductsContext);
    const location = useLocation().pathname.slice(1)
    let products = location === 'dog-food' ? dogFood : catFood;

    const [categories, setCategories] = useState([
        { id: 'allBtn', value: 'all', text: 'Всичко', isChacked: true },
        { id: 'medicalBtn', value: 'medical', text: 'Лечебна храна', isChacked: false },
        { id: 'wetBtn', value: 'wet', text: 'Мокра храна', isChacked: false },
        { id: 'dryBtn', value: 'dry', text: 'Суха храна', isChacked: false },
    ])
    const [activeCategories, setActiveCategories] = useState([categories[0].value]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    console.log(isloading)
    const handleCategoryBtn = (event) => {
        const value = event.target.dataset.value;
        const updatedCategories = categories.map(cat => ({
            ...cat,
            isChacked: cat.value === value,
        }));
        setCategories(updatedCategories);

        if (value === 'all') {
            setActiveCategories(['all']);
        } else {
            setActiveCategories([value]);
        }
    };
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    }

    const filterByCategory = (products, activeCategories) => {
        if (activeCategories.includes('all')) {
            return products;
        }
        return products.filter(product => activeCategories.includes(product.type));
    };

    const filterBySearch = (products, searchInput) => {
        if (!searchInput) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }


    useEffect(() => {
        let filtered = filterByCategory(products, activeCategories);
        filtered = filterBySearch(filtered, searchInput);
        setFilteredProducts(filtered);
    }, [activeCategories, searchInput, products]);


    return (
        <>
            {!isloading && <Preloader />}
            <section className={styles.foodPage}>
                <div className={styles.foodContainer}>
                    <div className={styles.searchBar}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search here"
                            onChange={handleSearchChange}
                            value={searchInput}
                        />
                        <img className={styles.searchIcon} src={search} alt="Search" />
                    </div>

                    {searchInput.length <= 0 && (
                        <div className={styles.categoryListWrap}>
                            <ul className={styles.categoryList}>
                                {categories.map((category, index) => (
                                    <li
                                        key={category.id}
                                        id={category.id}
                                        data-value={category.value}
                                        onClick={(event) => handleCategoryBtn(event, category.id)}
                                        className={categories[index].isChacked ? styles.active : ''}
                                    >
                                        {category.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

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
        </>
    )
}
