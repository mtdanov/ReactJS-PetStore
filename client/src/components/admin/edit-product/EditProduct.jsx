import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useValidation } from '../../../hooks/useValidation';
import useForm from '../../../hooks/useForm';
import Path from '../../../path';
import ProductsContext from '../../../contexts/productContext';
import * as productService from '../../../services/productService'

import styles from './EditProduct.module.css'
import upload_pic from '../../../../public/images/upload.png'
import useImageUpload from '../../../hooks/useImageUpload';
import Preloader from '../../Preloader/Preloader';

export default function EditProduct() {
    const { handleUpdateProductState } = useContext(ProductsContext)
    const [validateForm, errors] = useValidation()
    const [isloading, setloading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        type: '',
        file: '',
    })
    const { image, imageFile, onImageChange } = useImageUpload(product.file);

    const { data, onChange, onSubmit, } = useForm(product, async (formData) => {
        if (imageFile !== null) {
            formData.append('file', imageFile);
        } else if (image && typeof image === 'string') {
            formData.append('fileUrl', image);
        }
        try {
            if (validateForm('product', formData)) {
                setloading(true)
                const result = await productService.editProduct(id, formData)
                handleUpdateProductState(result)
                navigate(Path.Home)
                setloading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    });


    useEffect(() => {
        productService.getById(id).then(result => setProduct(result)).catch(err => console.log(err))
    }, [id])

    return (
        <>
            {isloading ? <Preloader /> :
                <section className={styles.editProduct}>
                    <div className={styles.postContainer}>
                        <div className={styles.postForm}>
                            <form onSubmit={onSubmit}>
                                <h2 className={styles.title}>Редактирай Продукт</h2>

                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Име:</label>
                                    <input
                                        id="name"
                                        className={styles.formControl}
                                        name="name"
                                        type="text"
                                        placeholder="Enter Title"
                                        value={data.name}
                                        onChange={onChange}
                                    />
                                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="price">Цена:</label>
                                    <input
                                        id="price"
                                        className={styles.formControl}
                                        name="price"
                                        type="number"
                                        placeholder="Enter Title"
                                        value={data.price}
                                        onChange={onChange}
                                    />
                                    {errors.price && <span className={styles.error}>{errors.price}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Категория:</label>
                                    <select
                                        id="category"
                                        className={styles.formControl}
                                        name="category"
                                        value={data.category}
                                        onChange={onChange}
                                    >
                                        <option value="">Избере категория</option>
                                        <option value="cat-food">Котки</option>
                                        <option value="dog-food">Кучета</option>
                                        <option value="dog-toys">Играчка за кучета</option>
                                        <option value="cat-toys">Играчка за котки</option>
                                        <option value="dog-treats">Лакомства за кучета</option>
                                        <option value="cat-treats">Лакомства за котки</option>
                                    </select>
                                    {errors.category && <span className={styles.error}>{errors.category}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="type">Вид:</label>
                                    <select
                                        id="type"
                                        className={styles.formControl}
                                        name="type"
                                        value={data.type}
                                        onChange={onChange}
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
                                        value={data.description}
                                        onChange={onChange}
                                    ></textarea>
                                    {errors.description && <span className={styles.error}>{errors.description}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="file">
                                        <img
                                            className={styles.pic}
                                            src={image ? image : upload_pic}
                                            alt=""
                                        />
                                    </label>
                                    <input
                                        id="file"
                                        className={styles.formControl}
                                        type="file"
                                        name="file"
                                        placeholder="Select File"
                                        onChange={onImageChange} />

                                    {errors.file && <span className={styles.error}>{errors.file}</span>}
                                </div>

                                <button type="submit" className={styles.editBtn}>Редактирай</button>
                            </form>
                        </div>
                    </div>
                </section>
            }
        </>

    )
}
