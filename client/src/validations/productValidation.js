export function productValidation(data) {
    const errors = {};
    if (data instanceof FormData) {
        data = Object.fromEntries(data)
    }
    if (!data.name) {
        errors.name = 'Името е задължително';
    }
    if (!data.price) {
        errors.price = 'Цената е задължителна';
    } else if (isNaN(data.price)) {
        errors.price = 'Цената трябва да е число';
    }
    if (!data.description) {
        errors.description = 'Описанието е задължително';
    }
    if (!data.category) {
        errors.category = 'Категорията е задължителна';
    }
    if (!data.file) {
        errors.file = 'Снимката е задъллжителна';
    }
    return errors;
};
