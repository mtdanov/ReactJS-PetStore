import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as articeService from '../../../services/articleService'
import { useValidation } from '../../../hooks/useValidation';
import useForm from '../../../hooks/useForm';
import Path from '../../../path';
import Preloader from '../../preloader/Preloader';

import upload_pic from '../../../../public/images/upload.png'
import styles from './CreateArticle.module.css'

const initialState = {
    title: '',
    description: '',
    file: null,
}
export default function CreateArticle() {
    const navigate = useNavigate()
    const [validateForm, errors] = useValidation()
    const [isloading, setloading] = useState(false)


    const { data, onChange, onSubmit, } = useForm(initialState, async (formData) => {
        try {
            if (validateForm('article', formData)) {
                setloading(true)
                await articeService.createArticle(formData)
                navigate(Path.Blog)
                setloading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    });

    return (
        <>
            {isloading ? <Preloader /> :
                <section className={styles.createArticle}>
                    <form className={styles.articleForm} onSubmit={onSubmit}>
                        <h2 className={styles.articleTitle}>Създай Статия</h2>

                        <div className={styles.createAnimaltName}>
                            <label className={styles.nameLabel} htmlFor="title">Заглавие:</label>
                            <input className={styles.nameInput} name='title' value={data.name} onChange={onChange} type="text" />
                            {errors.title && <span className={styles.error}>{errors.title}</span>}
                        </div>

                        <div className={styles.createAnimalDescription}>
                            <label className={styles.descriptionLabel} htmlFor="description">Описание:</label>
                            <textarea className={styles.description} name="description" value={data.description} onChange={onChange} id=""></textarea>
                            {errors.description && <span className={styles.error}>{errors.description}</span>}
                        </div>

                        <div className={styles.articlePic}>
                            <label htmlFor="file">
                                <img className={styles.pic}
                                    src={data.file ? URL.createObjectURL(data.file) : upload_pic}
                                    alt=""
                                />
                            </label>
                            <input type="file" className={styles.file} name='file' placeholder='Качи Снимка' onChange={onChange} />
                            {errors.file && <span className={styles.error}>{errors.file}</span>}
                        </div>
                        <button className={styles.createBtn}>Качи</button>
                    </form>
                </section>
            }
        </>
    )
}

