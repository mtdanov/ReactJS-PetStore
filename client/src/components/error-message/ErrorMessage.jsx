import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <div className={styles.errorMessage}>
            {message}
        </div>
    );
};
