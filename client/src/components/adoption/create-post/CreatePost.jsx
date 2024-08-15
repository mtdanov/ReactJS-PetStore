import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import upload_pic from '../../../../public/images/upload.png'
import AuthContext from '../../../contexts/authContext';
import * as  postService from '../../../services/postService'
import useForm from '../../../hooks/useForm';
import { useValidation } from '../../../hooks/useValidation';

import styles from './CreatePost.module.css'
import Path from '../../../path';
import Preloader from '../../Preloader/Preloader';

const initialState = {
    name: '',
    breed: '',
    age: '',
    description: '',
    file: null,
};

export default function CreatePost() {
    const navigate = useNavigate()
    const { userId } = useContext(AuthContext)
    const [isloading, setloading] = useState(false)

    const [validateForm, errors] = useValidation()

    const { data, onChange, onSubmit, } = useForm(initialState, async (formData) => {

        try {
            if (validateForm('post', formData)) {
                setloading(true)
                await postService.createPost(formData, userId)
                navigate(Path.Adoption)
                setloading(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    });

    return (
        <>
            {isloading ? <Preloader /> :
                <div className={styles.createPost} >
                    <form onSubmit={onSubmit} className={styles.formAnimal}>
                        <h2 className={styles.title}>Създай Публикация</h2>
                        <div className={styles.createAnimaltName}>
                            <label className={styles.nameLabel} htmlFor="name">Име:</label>
                            <input className={styles.nameInput} name='name' value={data.name} onChange={onChange} type="text" />
                            {errors.name && <span className={styles.error}>{errors.name}</span>}
                        </div>
                        <div className={styles.createAnimalBreed}>
                            <label className={styles.breedLabel} htmlFor="breed">Порода:</label>
                            <input className={styles.breedInput} name='breed' value={data.breed} onChange={onChange} type="text" />
                            {errors.breed && <span className={styles.error}>{errors.breed}</span>}
                        </div>
                        <div className={styles.createAnimalAge}>
                            <label className={styles.ageLabel} htmlFor="age">Години:</label>
                            <input className={styles.ageInput} name='age' value={data.age} onChange={onChange} type="text" />
                            {errors.age && <span className={styles.error}>{errors.age}</span>}
                        </div>
                        <div className={styles.createAnimalDescription}>
                            <label className={styles.descriptionLabel} htmlFor="description">Описание:</label>
                            <textarea className={styles.description} name="description" value={data.description} onChange={onChange} id=""></textarea>
                            {errors.description && <span className={styles.error}>{errors.description}</span>}
                        </div>
                        <div className={styles.createAnimalPic}>
                            <label htmlFor="file">
                                <img className={styles.pic}
                                    src={data.file ? URL.createObjectURL(data.file) : upload_pic}
                                    alt=""
                                />
                            </label>
                            <input type="file" className={styles.file} name='file' placeholder='Качи Снимка' onChange={onChange} />
                            {errors.file && <span className={styles.error}>{errors.file}</span>}
                        </div>
                        <button className={styles.createBtn}>Създай</button>
                    </form >
                </div >
            }
        </>
    )
}
