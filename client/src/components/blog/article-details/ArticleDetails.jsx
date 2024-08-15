import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'

import AuthContext from '../../../contexts/authContext';
import * as articleService from '../../../services/articleService'
import Comments from '../../comments/Comments';

import styles from './ArticleDetails.module.css'
import useDelete from '../../../hooks/useDelete';

export default function ArticleDetails() {
    const { articleId } = useParams()
    const { role, username } = useContext(AuthContext)

    const [article, setArticle] = useState({})

    const { onDelete } = useDelete();

    useEffect(() => {
        articleService.getOne(articleId).then(res => {
            setArticle(res)
        }).catch(err => console.log(err))
    }, [articleId])


    return (
        <section className={styles.blogPage}>
            <div className={styles.blog}>
                <div className={styles.blogDetails}>
                    <h2 className={styles.articleTitle}>{article.title}</h2>
                    <img className={styles.articleImg} src={article.file} alt="" />
                    <div className={styles.articleDescription}>Описание: {article.description}</div>
                </div>
                {role === 'admin' &&
                    <div className={styles.adminBtns}>
                        <Link className={styles.editBtn} to={`/edit-article/${article._id}`}>Edit</Link>
                        <button className={styles.deleteBtn} onClick={() => onDelete(article._id, 'article')}>Delete</button>
                    </div>
                }
                <Comments id={articleId} username={username} type='article' />
            </div>
        </section >
    )
}

