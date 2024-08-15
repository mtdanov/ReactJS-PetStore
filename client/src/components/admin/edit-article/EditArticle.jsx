import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import useForm from '../../../hooks/useForm';
import { useValidation } from '../../../hooks/useValidation';
import * as articleService from '../../../services/articleService'
import Path from '../../../path';
import Preloader from '../../preloader/Preloader';
import useImageUpload from '../../../hooks/useImageUpload';

import upload_pic from '../../../../public/images/upload.png'
import styles from "./EditArticle.module.css"

export default function EditArticle() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [isloading, setloading] = useState(false)
    const [article, setArticle] = useState({
        title: '',
        description: '',
        file: '',
    })

    const [validateForm, errors] = useValidation()

    const { image, imageFile, onImageChange } = useImageUpload(article.file);

    const { data, onChange, onSubmit, } = useForm(article, async (formData) => {
        if (imageFile !== null) {
            formData.append('file', imageFile);
        } else if (image && typeof image === 'string') {
            formData.append('fileUrl', image);
        }
        try {
            if (validateForm('article', formData)) {
                setloading(true)
                await articleService.editArticle(id, formData)
                navigate(Path.Blog)
                setloading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    });

    useEffect(() => {
        articleService.getById(id).then(result => {
            setArticle(result)
        }).catch(err => console.log(err))
    }, [id])

    return (
        <>
            {isloading ? <Preloader /> :
                <div className={styles.postContainer}>
                    <div className={styles.postForm}>
                        <form onSubmit={onSubmit}>
                            <h2 className={styles.title}>Редактирай Пост</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="title">Име:</label>
                                <input
                                    id="title"
                                    className={styles.formControl}
                                    name="title"
                                    type="text"
                                    placeholder="Enter Title"
                                    value={data.title}
                                    onChange={onChange}
                                />
                                {errors.title && <span className={styles.error}>{errors.title}</span>}
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
                                    type="file"
                                    className={styles.formControl}
                                    name="file"
                                    placeholder="Select File"
                                    onChange={onImageChange} />
                                {errors.file && <span className={styles.error}>{errors.file}</span>}
                            </div>
                            <button type="submit" className={styles.editBtn}>Редактирай</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
