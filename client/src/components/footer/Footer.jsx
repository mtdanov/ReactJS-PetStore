import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

import Path from "../../path";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <Link to={Path.Home}><p className={styles.paragraphs}>Начало</p></Link>
        <Link to={Path.Service}><p className={styles.paragraphs}>Услуги</p></Link>
        <Link to={Path.About}><p className={styles.paragraphs}>За нас</p></Link>
        <Link to={Path.Blog}><p className={styles.paragraphs}>Статии</p></Link>
        <Link to={Path.Contact}><p className={styles.paragraphs}>Контакти</p></Link>
      </div>
    </div>
  );
}