import { Link } from "react-router-dom";

import add_icon from '../../../public/images/add_icon.png'
import delivery_icon from '../../../public/images/delivery.png'
import profile_icon from '../../../public/images/profile.png'
import message_icon from '../../../public/images/message.png'

import Path from "../../path";
import styles from "./Profile.module.css"

export default function Profile() {
    return (
        < div className={styles.profile}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarOptions}>
                    <Link to={Path.CreatePost} className={styles.sidebarOption}>
                        <img src={add_icon} alt="" />
                        <p>Създай Публикация</p>
                    </Link>
                    <Link to={Path.Orders} className={styles.sidebarOption}>
                        <img src={delivery_icon} alt="" />
                        <p>Поръчки</p>
                    </Link>
                    <Link to={Path.ProfileInfo} className={styles.sidebarOption}>
                        <img src={profile_icon} alt="" />
                        <p>Профил</p>
                    </Link>
                    <Link to={Path.Messages} className={styles.sidebarOption}>
                        <img src={message_icon} alt="" />
                        <p>Съобщения</p>
                    </Link>
                </div>
            </div>
        </div >
    )
}
