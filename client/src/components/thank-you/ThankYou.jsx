import { useContext, useEffect, useState } from 'react'
import * as profileService from '../../services/profileService'
import thank from '../../../public/images/thanks.png'
import styles from './ThankYou.module.css'
import AuthContext from '../../contexts/authContext'
export default function ThankYou() {
    const { userId } = useContext(AuthContext)
    const [profile, setProfile] = useState([])

    useEffect(() => {
        profileService.getProfile(userId).then(result => setProfile(result)).catch(error => console.log(error))
    }, [])


    return (
        <section className={styles.thank}>
            <h2 className={styles.thankTitle}>Благодаря, че пазарувахте при нас!</h2>
            <div className={styles.thankContainer}>
                <div className={styles.deliveryCard}>
                    <h3 className={styles.deliveryTitle}>Информация за доставка:</h3>
                    <div className={styles.deliveryInfo}>
                        <p>Име: {profile.name}</p>
                        <p>Фамилия: {profile.lastName}</p>
                        <p>Град: {profile.city}</p>
                        <p>Улица: {profile.street}</p>
                        <p>Номер на улица: {profile.streetNumber}</p>
                    </div>
                </div>
                <img className={styles.thankPic} src={thank} alt="Thank You Image" />
            </div>
        </section>

    )
}