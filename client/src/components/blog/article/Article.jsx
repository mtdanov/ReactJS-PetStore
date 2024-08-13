import { Link } from "react-router-dom";

import styles from './Article.module.css';

export default function Article({ _id, title, description, file }) {

    return (
        <div className={styles.article}>
            <h3 className={styles.blogTitle}>{title}</h3>
            <img className={styles.articleImg} src={`http://localhost:3010/images/${file}`} alt="Image 1" />
            <Link to={`/details/${_id}`} className={styles.readMore}>
                Прочетете
            </Link>
        </div >
    )
}