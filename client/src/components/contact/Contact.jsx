// import pic from '../../../public/images/contact-us.png'
import useForm from "../../hooks/useForm"
import { useNavigate } from "react-router-dom";

import { useValidation } from "../../hooks/useValidation"
import Path from '../../path'

import styles from "./Contact.module.css"

import * as contactUsService from '../../services/contactUsService'
const initialState = {
    name: '',
    email: '',
    phone: '',
    text: '',
}
export default function Contact() {
    const navigate = useNavigate()
    const [validateForm, errors] = useValidation()
    const { data, onChange, onSubmit } = useForm(initialState, async (formData) => {
        try {
            if (validateForm('contact', formData)) {
                await contactUsService.createMessage(formData)
                navigate(Path.Home)
            }
        } catch (error) {
            console.log(error.message);
        }
    })

    return (
        <div className={styles.contact}>
            <form onSubmit={onSubmit} className={styles.contactForm}>
                <h2 className={styles.contactHeader}>Пишете ни</h2>
                {/* <img className={styles.contactPic} src={pic} alt="" /> */}

                <div className={styles.contactFields}>
                    <label htmlFor="">Име: </label>
                    <input className={styles.contactInput} type="text" name="name" value={data.name} onChange={onChange} />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}

                </div>
                <div className={styles.contactFields}>
                    <label htmlFor="">Е-мейл: </label>
                    <input className={styles.contactInput} type="text" name="email" value={data.email} onChange={onChange} />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}

                </div>
                <div className={styles.contactFields}>
                    <label htmlFor="">Телефон: </label>
                    <input className={styles.contactInput} type="text" name="phone" value={data.phone} onChange={onChange} />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}

                </div>
                <div className={styles.contactFields}>
                    <label htmlFor="">Съобщение: </label>
                    <textarea className={styles.contactTextarea} type="text" name="text" value={data.text} onChange={onChange} />
                    {errors.text && <span className={styles.error}>{errors.text}</span>}
                </div>

                <button className={styles.contactBtn}>Изпрати</button>
            </form>
        </div>
    )
}