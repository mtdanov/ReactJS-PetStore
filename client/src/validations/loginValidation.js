
export function loginValidation(data) {
    const errors = {};

    if (!data.email) {
        errors.email = 'Е-мейл is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Е-мейл is invalid';
    }

    if (!data.password) {
        errors.password = 'Парола is required';
    }

    return errors;
};
