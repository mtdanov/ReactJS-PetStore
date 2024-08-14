export function categoryValidation(data) {
    const errors = {};

    if (!data.name) {
        errors.name = 'Името за задължително';
    }

    return errors;
};
