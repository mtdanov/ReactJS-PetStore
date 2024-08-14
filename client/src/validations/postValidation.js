export function postValidator(data) {
    const errors = {};
    if (data instanceof FormData) {
        data = Object.fromEntries(data)
    }
    if (!data.name) {
        errors.name = 'Името е задължително';
    }
    if (!data.breed) {
        errors.breed = 'Породата е задължителна';
    }
    if (!data.age) {
        errors.age = 'Годините са задължителни';
    } else if (isNaN(data.age)) {
        errors.age = 'Годините трябва да са число';
    }
    if (!data.description) {
        errors.description = 'Описанието е задължително';
    }
    if (!data.file) {
        errors.file = 'Снимка е задължителна';
    }

    return errors;
};