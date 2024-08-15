import { useEffect } from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, clearError }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                clearError();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, clearError]);

    if (!message) return null;

    return (
        <div className={`${styles.errorMessage}`}>
            {message}
        </div>
    );
};


export default ErrorMessage;
