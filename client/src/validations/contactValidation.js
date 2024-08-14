export function contactValidation(data) {
    const errors = {};

    if (!data.name || data.name.trim() === '') {
        errors.name = 'Името е задължително';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!data.phone || data.phone.trim() === '') {
        errors.phone = 'Телефонен номер е задължителен';
    } else if (!phoneRegex.test(data.phone)) {
        errors.phone = 'Номерът трябва да е 10 цифри';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || data.email.trim() === '') {
        errors.email = 'Е-мейл е задължителен';
    } else if (!emailRegex.test(data.email)) {
        errors.email = 'Е-мейл е невалиден';
    }

    if (!data.text || data.text.trim() === '') {
        errors.text = 'Съобщението е задължително';
    }
    return errors;
}
