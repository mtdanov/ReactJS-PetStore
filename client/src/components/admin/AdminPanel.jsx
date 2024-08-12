import { Link } from 'react-router-dom'

import add_icon from '../../../public/images/add_icon.png'

import styles from "./AdminPanel.module.css"
import Path from '../../path'

export default function AdminPanel() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarOptions}>
                <Link to={Path.Select} className={styles.sidebarOption}>
                    <img src={add_icon} alt="" />
                    <p>Създай Продукт</p>
                </Link>
                <Link to={Path.CreateArticle} className={styles.sidebarOption}>
                    <img src={add_icon} alt="" />
                    <p>Създай Статия</p>
                </Link>
            </div>
        </div>
    )
}