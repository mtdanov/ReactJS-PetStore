import useForm from '../../../hooks/useForm'
import { useValidation } from '../../../hooks/useValidation'

import * as adoptionContactService from '../../../services/adoptionContactService'

import styles from './AdoptionContact.module.css'

const initialValues = {
    name: '',
    phone: '',
    email: '',
    text: '',
}
export default function AdoptionContact({ owner, onClose }) {
    const [validateForm, errors] = useValidation()


    const { data, onChange, onSubmit } = useForm(initialValues, async (message) => {
        message.owner = owner
        try {
            if (validateForm('contact', message)) {
                await adoptionContactService.createMessage(data)
                onClose()
            }
        } catch (err) {
            console.log(err);
        }
    }
    )
    return (
        <div className={styles.contactAdoption} >
            <button className={styles.closeButton} onClick={onClose}>x</button>
            <form className={styles.formContainer} onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.contactLabel} htmlFor="name">Име:</label>
                    <input className={styles.contactInputName}
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={onChange}
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.contactLabel} htmlFor="phone">Телефонен номер:</label>
                    <input className={styles.contactInputPhone}
                        type="tel"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={onChange}
                    />
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.contactLabel} htmlFor="email">Имейл:</label>
                    <input className={styles.contactInputEmail}
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={onChange}
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.contactLabel} htmlFor="message">Съобщение:</label>
                    <textarea className={styles.contactTextarea}
                        id="text"
                        name="text"
                        value={data.text}
                        onChange={onChange}
                    ></textarea>
                    {errors.text && <p className={styles.error}>{errors.text}</p>}
                </div>

                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>

    )
}