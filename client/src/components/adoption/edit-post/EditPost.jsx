import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import * as postService from '../../../services/postService'
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../../hooks/useValidation";

import upload_pic from '../../../../public/images/upload.png'
import styles from './EditPost.module.css'
import useImageUpload from "../../../hooks/useImageUpload";
import Path from "../../../path";
import Preloader from "../../preloader/Preloader";

export default function EditPost() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isloading, setloading] = useState(false)
    
    const [validateForm, errors] = useValidation()
    
    const [post, setPost] = useState({
        name: '',
        breed: '',
        age: '',
        description: '',
        file: '',
    })
    
    const { image, imageFile, onImageChange } = useImageUpload(post.file);

    const { data, onChange, onSubmit, } = useForm(post, async (formData) => {
        if (imageFile !== null) {
            formData.append('file', imageFile);
        } else if (image && typeof image === 'string') {
            formData.append('fileUrl', image);
        }
        try {
            if (validateForm('post', formData)) {
                setloading(true)
                await postService.editPost(id, formData)
                navigate(Path.Adoption)
                setloading(false)

            }
        } catch (error) {
            console.log(error.message);
        }
    });

    useEffect(() => {
        postService.getPostEdit(id).then(result => setPost(result)).catch(err => console.log(err))
    }, [])

    return (
        <>
            {isloading ? <Preloader /> :
                <section className={styles.editPost}>
                    <div className={styles.postContainer}>
                        <div className={styles.postForm}>
                            <form onSubmit={onSubmit}>
                                <h2 className={styles.title}>Редактирай Пост</h2>

                                <div className={styles.editAnimalName}>
                                    <label htmlFor="name">Име:</label>
                                    <input name="name" type="text" placeholder='Enter Title' value={data.name} onChange={onChange} />
                                    {errors.name && <span className={styles.error}>{errors.name}</span>}

                                </div>

                                <div className={styles.editAnimalBreed}>
                                    <label htmlFor="breed">Порода:</label>
                                    <input name="breed" type="text" placeholder='Enter Title' value={data.breed} onChange={onChange} />
                                    {errors.breed && <span className={styles.error}>{errors.breed}</span>}

                                </div>

                                <div className={styles.editAniamlAge}>
                                    <label htmlFor="age">Години:</label>
                                    <input name='age' type='text' placeholder='Enter Title' value={data.age} onChange={onChange} />
                                    {errors.age && <span className={styles.error}>{errors.age}</span>}

                                </div>

                                <div className={styles.editAniamlDescription}>
                                    <label htmlFor="description">Описание:</label>
                                    <textarea name="description" id="description" cols='30' rows='10' value={data.description} onChange={onChange} ></textarea>
                                    {errors.description && <span className={styles.error}>{errors.description}</span>}

                                </div>

                                <div className={styles.editAnimalPic}>
                                    <label htmlFor="file">
                                        <img className={styles.pic}
                                            src={image ? image : upload_pic}
                                            alt="" />
                                    </label>
                                    <input type="file" className='file' name='file' placeholder='Select File' onChange={onImageChange} />
                                    {errors.file && <span className={styles.error}>{errors.file}</span>}
                                </div>
                                <button className={styles.editBtn}>Редактирай</button>
                            </form>
                        </div>
                    </div >
                </section >
            }
        </>
    )
}
