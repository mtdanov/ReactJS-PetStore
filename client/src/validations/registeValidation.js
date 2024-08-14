export function registerValidation(data) {
    const errors = {};
    if (!data.name) {
        errors.name = 'Името е задължително';
    }

    if (!data.lastName) {
        errors.lastName = 'Фамилия е задължителна';
    }

    if (!data.city) {
        errors.city = 'Града е задължителен';
    }

    if (!data.street) {
        errors.street = 'Улицата е задължителна';
    }

    if (!data.streetNumber) {
        errors.streetNumber = 'Номер на улица е задължително';
    }

    if (!data.email) {
        errors.email = 'Имейл е задължителен';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Невалиден имейл';
    }

    if (!data.password) {
        errors.password = 'Паролата задължителна';
    } else if (data.password.length < 6) {
        errors.password = 'Парола трябва да е поне 6 символа';
    }

    if (!data.rePass) {
        errors.rePass = 'Повтори паролата е задължително';
    } else if (data.rePass !== data.password) {
        errors.rePass = 'Паролите не съвпадат';
    }

    return errors;
};