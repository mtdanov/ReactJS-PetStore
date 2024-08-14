export function articleValidation(data) {
    const errors = {};
    if (data instanceof FormData) {
        data = Object.fromEntries(data)
    }

    if (!data.title) {
        errors.title = 'Заглавието е задължително';
    }
    if (!data.description) {
        errors.description = 'Съдържанието е задължително';
    }
    if (!data.file) {
        errors.file = 'Снимката е задължителна';
    }
    return errors;
};
