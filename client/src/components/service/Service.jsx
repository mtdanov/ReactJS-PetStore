import styles from './Service.module.css'

import vet from "../../../public/images/font-vet.jpg";

export default function Service() {
    return (
        <div className={styles.service}>
            <div className={styles.serviceContainer}>
                <img src={vet} alt="Veterinary Services" />
                <div className={styles.textOverlay}>
                    <p>Ветеринарни услуги</p>
                    <p>Консултации</p>
                    <p>Ваксинации</p>
                    <p>Чипиране</p>
                    <p>Издаване на паспорт</p>
                    <p>Лечение и профилактика</p>
                </div>
            </div>
        </div>
    )
}

