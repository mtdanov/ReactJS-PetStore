import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import Path from "../../path";
import * as authService from "../../services/authService";
import { useValidation } from "../../hooks/useValidation";
import useError from "../../hooks/useErrorMessage";
import ErrorMessage from "../errorMessage/ErrorMessage";


import styles from "./Login.module.css";
import useFormHandler from "../../hooks/useForm";

const LoginFormKeys = {
    Email: "email",
    Password: "password",
};
const initialState = {
    [LoginFormKeys.Email]: "",
    [LoginFormKeys.Password]: "",
}

export default function Login() {
    const { changeAuthState } = useContext(AuthContext);
    const [validateForm, errors] = useValidation()
    const navigate = useNavigate()

    const { errorMsg, showError } = useError()
    const { data, onChange, onSubmit } = useFormHandler(initialState, async (formData) => {


        try {
            if (validateForm('login', formData)) {
                const result = await authService.login(formData)
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
            <div className={styles.login}>
                <div className={styles.loginForm}>
                    <h2 className={styles.loginTitle}>Влез</h2>
                    <form onSubmit={onSubmit}>

                        <label className={styles.loginLabels} htmlFor="email">Е-мейл:</label>
                        <input
                            className={styles.loginFields}
                            type="text"
                            name={LoginFormKeys.Email}
                            value={data[LoginFormKeys.Email]}
                            onChange={onChange}
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}


                        <label className={styles.loginLabels} htmlFor="password">Парола:</label>
                        <input
                            className={styles.loginFields}
                            type="password"
                            name={LoginFormKeys.Password}
                            value={data[LoginFormKeys.Password]}
                            onChange={onChange}
                        />
                        {errors.password && <span className={styles.error}>{errors.password}</span>}

                        <button className={styles.loginBtn} type="submit">
                            Вход
                        </button>
                    </form>
                </div>
            </div >
        </>
    );
}
