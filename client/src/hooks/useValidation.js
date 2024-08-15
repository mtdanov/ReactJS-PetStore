import { useState } from 'react';
import { postValidator } from '../validations/postValidation';
import { articleValidation } from '../validations/articleValidation';
import { productValidation } from '../validations/productValidation';
import { registerValidation } from '../validations/registeValidation';
import { loginValidation } from '../validations/loginValidation';
import { commentValidation } from '../validations/commentValidation';
import { contactValidation } from '../validations/contactValidation';
import { categoryValidation } from '../validations/categoryValidation';
import { profileValidation } from '../validations/profileValidation';
export function useValidation() {
    const [errors, setErrors] = useState({});

    const validateForm = (type, formData) => {

        // console.log(Object.fromEntries(formData))
        // let data = ''
        // if (type !== 'login' && type !== 'register' && type !== 'comment' && type !== 'contact') {

        //     data = Object.fromEntries(formData.entries());
        //     console.log(data);

        // }

        if (type === 'post') {
            const validation = postValidator(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        } else if (type === 'article') {
            const validation = articleValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        } else if (type === 'product') {
            const validation = productValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        } else if (type === 'register') {
            const validation = registerValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        }
        else if (type === 'login') {
            const validation = loginValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        }
        else if (type === 'comment') {
            const validation = commentValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        }
        else if (type === 'contact') {
            const validation = contactValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        }
        else if (type === 'category') {
            const validation = categoryValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        } else if (type === 'profile') {
            const validation = profileValidation(formData)
            setErrors(validation);
            return Object.keys(validation).length === 0;
        }
    }

    return [validateForm, errors]
}
