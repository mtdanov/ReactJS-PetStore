import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

import AuthContext from "../../context/AuthContext";
import Path from "../../path";

import styles from "./Register.module.css"
import useFormHandler from "../../hooks/useForm";
import { useValidation } from "../../hooks/useValidation";
import useError from "../../hooks/useErrorMessage";
import ErrorMessage from "../error-message/ErrorMessage";
;

const RegisterFormKeys = {
    Name: "name",
    LastName: 'lastName',
    Email: "email",
    Password: "password",
    RePass: "rePass",
    Country: 'country',
    City: 'city',
    Street: 'street',
    StreetNumber: 'streetNumber'
};
const initialState = {
    [RegisterFormKeys.Name]: "",
    [RegisterFormKeys.LastName]: "",
    [RegisterFormKeys.Email]: "",
    [RegisterFormKeys.Password]: "",
    [RegisterFormKeys.RePass]: "",
    [RegisterFormKeys.Country]: "",
    [RegisterFormKeys.City]: "",
    [RegisterFormKeys.Street]: "",
    [RegisterFormKeys.StreetNumber]: "",
}

export default function Register() {
    const { changeAuthState } = useContext(AuthContext);
    const [validateForm, errors] = useValidation()

    const navigate = useNavigate()


    const { errorMsg, showError } = useError()

    const { data, onChange, onSubmit } = useFormHandler(initialState, async (formData) => {
        try {
            if (validateForm('register', formData)) {
                const result = await authService.register(formData)
                changeAuthState(result);
                navigate(Path.Home);
            }
        } catch (error) {
            showError(error.message);
        }
    });

    return (
        <>
            <ErrorMessage message={errorMsg} />
            <div className={styles.register}>
                <form onSubmit={onSubmit} className={styles.registerForm}>
                    <h2>Регистрация</h2>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="firstName">Име</label>
                        <input className={styles.registerInputs} type="text" id="firstName" name={RegisterFormKeys.Name} value={data[RegisterFormKeys.Name]} onChange={onChange} />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="lastName">Фамилия</label>
                        <input className={styles.registerInputs} type="text" id="lastName" name={RegisterFormKeys.LastName} value={data[RegisterFormKeys.LastName]} onChange={onChange} />
                        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="city">Град</label>
                        <input className={styles.registerInputs} type="text" id="city" name={RegisterFormKeys.City} value={data[RegisterFormKeys.City]} onChange={onChange} />
                        {errors.city && <span className={styles.error}>{errors.city}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="streetNumber">Улица</label>
                        <input className={styles.registerInputs} type="text" id="street" name={RegisterFormKeys.Street} value={data[RegisterFormKeys.Street]} onChange={onChange} />
                        {errors.street && <span className={styles.error}>{errors.street}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="streetNumber">Номер на улица</label>
                        <input className={styles.registerInputs} type="text" id="streetNumber" name={RegisterFormKeys.StreetNumber} value={data[RegisterFormKeys.StreetNumber]} onChange={onChange} />
                        {errors.streetNumber && <span className={styles.error}>{errors.streetNumber}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="email">Имейл</label>
                        <input className={styles.registerInputs} type="email" id="email" name={RegisterFormKeys.Email} value={data[RegisterFormKeys.Email]} onChange={onChange} />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="password">Парола</label>
                        <input className={styles.registerInputs} type="password" id="password" name={RegisterFormKeys.Password} value={data[RegisterFormKeys.Password]} onChange={onChange} />
                        {errors.password && <span className={styles.error}>{errors.password}</span>}
                    </div>
                    <div className={styles.registerFields}>
                        <label className={styles.registerLabel} htmlFor="confirmPassword">Повтори парола</label>
                        <input className={styles.registerInputs} type="password" id="confirmPassword" name={RegisterFormKeys.RePass} value={data[RegisterFormKeys.RePass]} onChange={onChange} />
                        {errors.rePass && <span className={styles.error}>{errors.rePass}</span>}

                    </div>
                    <div className={styles.registerFields}>
                        <button className={styles.registerBtn} type="submit">
                            Регистрация
                        </button>
                    </div>
                    <p className={styles.haveAcc}>
                        Вече имаш регистрация?
                        <Link to="/login">
                            <span className={styles.loginHere}> Влез тук</span>
                        </Link>
                    </p>
                </form >
            </div >
        </>
    );
}
