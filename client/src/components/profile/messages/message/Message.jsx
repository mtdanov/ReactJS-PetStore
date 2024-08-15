import useHandleDelete from '../../../../hooks/useDelete'

import styles from './Message.module.css'

export default function Message({ name, phone, email, text, _id }) {
    const handleDelete = useHandleDelete()
    return (
        <div className={styles.emailMessageCard}>
            <div className={styles.emailHeader}>
                <div className={styles.emailFrom}>
                    От: {name}
                </div>
                <div className={styles.emailContactInfo}>
                    <span>Телефонен номер: {phone}</span>
                    <span>Имейл: {email}</span>
                </div>
            </div>
            <div className={styles.emailBody}>
                Съобщение:
                <p>{text}</p>
            </div>
            <button className={styles.deleteBtn} onClick={() => handleDelete(_id, 'message')} >Delete</button>
        </div>
    )
}
