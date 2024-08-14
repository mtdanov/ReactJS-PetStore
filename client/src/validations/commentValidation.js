export function commentValidation(data) {
    const errors = {};

    if (data === '') {
        errors.comment = 'Напишете коментар';
    }

    return errors;
};
