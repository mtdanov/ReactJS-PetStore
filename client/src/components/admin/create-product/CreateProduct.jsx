import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import * as categoryService from '../../../services/categoryService'
import * as productService from '../../../services/productService'
import Path from '../../../path';
import ProductsContext from '../../../contexts/productContext';
import useForm from '../../../hooks/useForm';
import { useValidation } from '../../../hooks/useValidation';

import upload_pic from '../../../../public/images/upload.png'
import styles from "./CreateProduct.module.css"

const initialState = {
    name: '',
    description: '',
    price: '',
    category: '',
    totalPrice: 0,
    type: '',
    file: null,
}


export default function CreateProduct() {
    const [validateForm, errors] = useValidation()
    const { handleAddProductState } = useContext(ProductsContext)
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    const { data, onChange, onSubmit } = useForm(initialState, async (formData) => {
        try {
            if (validateForm('product', formData)) {
                const result = await productService.createProduct(formData)
                console.log(result);
                handleAddProductState(result)
                navigate(Path.Home)
            }
        } catch (error) {
            console.log(error.message);
        }
    });

    useEffect(() => {
        categoryService.getCategories().then(result => setCategories(result)).catch(error => console.log(error))
    }, [])

    return (

        <section className={styles.createProductPage}>
            <div className={styles.postContainer}>
                <form className={styles.postForm} onSubmit={onSubmit}>
                    <h2 className={styles.postHeader}>Създай Продукт</h2>

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Име на продукта:</label>
                        <input
                            id="name"
                            className={styles.formControl}
                            value={data.name}
                            name="name"
                            type="text"
                            placeholder="Име на продукта"
                            onChange={onChange}
                        />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price">Цена:</label>
                        <input
                            id="price"
                            className={styles.formControl}
                            value={data.price}
                            name="price"
                            type="number"
                            placeholder="Цена"
                            onChange={onChange}
                        />
                        {errors.price && <span className={styles.error}>{errors.price}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category">Категория:</label>
                        <select
                            id="category"
                            className={styles.formControl}
                            onChange={onChange}
                            name="category"
                            value={data.category}
                        >
                            <option value="">Избери</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className={styles.error}>{errors.category}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="type">Вид:</label>
                        <select
                            id="type"
                            className={styles.formControl}
                            onChange={onChange}
                            name="type"
                            value={data.type}
                        >
                            <option value=""></option>
                            <option value="medical">Лечебна</option>
                            <option value="wet">Мокра</option>
                            <option value="dry">Суха</option>
                        </select>
                        {errors.type && <span className={styles.error}>{errors.type}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Описание:</label>
                        <textarea
                            id="description"
                            className={styles.formControl}
                            name="description"
                            cols="30"
                            rows="10"
                            placeholder="Описание"
                            onChange={onChange}
                        />
                        {errors.description && <span className={styles.error}>{errors.description}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="file">
                            <img
                                className={styles.pic}
                                src={data.file ? URL.createObjectURL(data.file) : upload_pic}
                                alt=""
                            />
                        </label>
                        <input
                            id="file"
                            type="file"
                            className={styles.formControl}
                            name="file"
                            placeholder="Качи Снимка"
                            onChange={onChange}
                        />
                        {errors.file && <span className={styles.error}>{errors.file}</span>}
                    </div>

                    <button className={styles.createBtn}>Създай</button>
                </form>
            </div>
        </section>
    )
}
