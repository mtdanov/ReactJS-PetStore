import styles from './CreateCategory.module.css';
import * as categoryService from '../../../services/categoryService'
import useForm from '../../../hooks/useForm';
import { useValidation } from '../../../hooks/useValidation';
import { useNavigate } from 'react-router-dom';
const initialCategoryState = {
    name: '',
};

export default function CreateCategory() {
    const navigate = useNavigate()
    const [validateForm, errors] = useValidation()


    const { data, onChange, onSubmit } = useForm(initialCategoryState, async (formData) => {
        try {
            if (validateForm('category', formData)) {
                await categoryService.createCategory(formData);
                navigate('/create-product')
            }
        } catch (error) {
            console.log(error.message);
        }
    })
    return (
        <section className={styles.createCategoryPage}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h2 className={styles.header}>Създай нова категория</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Име на категория:</label>
                        <input
                            id="name"
                            className={styles.formControl}
                            value={data.name}
                            name="name"
                            type="text"
                            onChange={onChange}
                        />
                    </div>
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                    <button type="submit" className={styles.createBtn}>
                        Създай Категория
                    </button>
                </form>
            </div>
        </section>
    );
}

