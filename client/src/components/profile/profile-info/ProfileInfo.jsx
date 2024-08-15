import React, { useContext, useEffect, useState } from 'react'
import * as profileService from '../../../services/profileService';
import AuthContext from "../../../contexts/authContext";
import useForm from '../../../hooks/useForm'

import styles from './ProfileInfo.module.css'
import { useValidation } from '../../../hooks/useValidation';

const ProfileFormKeys = {
    Name: "name",
    LastName: 'lastName',
    Email: "email",
    City: 'city',
    Street: 'street',
    StreetNumber: 'streetNumber'
    // Country: 'country',
    // Password: "password",
    // RePass: "rePass",
};


export default function ProfileInfo() {
    const { userId } = useContext(AuthContext)
    const [validateForm, errors] = useValidation()
    const [profile, setProfile] = useState({
        [ProfileFormKeys.Name]: "",
        [ProfileFormKeys.LastName]: "",
        [ProfileFormKeys.Email]: "",
        [ProfileFormKeys.Country]: "",
        [ProfileFormKeys.City]: "",
        [ProfileFormKeys.Street]: "",
        [ProfileFormKeys.StreetNumber]: "",
    })
    console.log(profile)
    const { data, onChange, onSubmit } = useForm(profile, async (formData) => {

        try {
            if (validateForm('profile', formData)) {
                const result = await profileService.editProfile(userId, formData)
                setProfile(state => ({ ...state, result }))
            }
        } catch (err) {
            console.log(err);
        }

    })
    useEffect(() => {
        profileService.getProfile(userId).then(result => setProfile(result)).catch(error => console.log(error))
    }, [userId])


    return (
        <section className={styles.profilePage}>
            <div className={styles.profileInfo}>
                <form onSubmit={onSubmit} className={styles.profileForm}>
                    <h2>Профил</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstName">Име</label>
                        <input
                            type="text"
                            id="firstName"
                            name={ProfileFormKeys.Name}
                            value={data.name}
                            onChange={onChange}
                            className={styles.formControl}
                        />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastName">Фамилия</label>
                        <input
                            type="text"
                            id="lastName"
                            name={ProfileFormKeys.LastName}
                            value={data.lastName}
                            onChange={onChange}
                            className={styles.formControl}
                        />
                        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">Град</label>
                        <input
                            type="text"
                            id="city"
                            name={ProfileFormKeys.City}
                            value={data.city}
                            onChange={onChange}
                            className={styles.formControl}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="street">Улица</label>
                        <input
                            type="text"
                            id="street"
                            name={ProfileFormKeys.Street}
                            value={data.street}
                            onChange={onChange}
                            className={styles.formControl}
                        />
                        {errors.street && <span className={styles.error}>{errors.street}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="streetNumber">Номер на улица</label>
                        <input
                            type="text"
                            id="streetNumber"
                            name={ProfileFormKeys.StreetNumber}
                            value={data.streetNumber}
                            onChange={onChange}
                            className={styles.formControl}
                        />
                        {errors.streetNumber && <span className={styles.error}>{errors.streetNumber}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Имейл</label>
                        <input
                            type="email"
                            id="email"
                            name={ProfileFormKeys.Email}
                            value={data.email}
                            onChange={onChange}
                            className={styles.formControl}
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="submit"
                            value="Редактирай"
                            className={styles.submitButton}
                        />
                    </div>
                </form>
            </div>
        </section>

    )
}