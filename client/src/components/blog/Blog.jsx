import { useEffect, useState } from "react";

import * as articleService from '../../services/articleService'
import Article from "./article/Article";

import styles from "./Blog.module.css";

export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    articleService.getAll().then(result => setArticles(result)).catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.articlesContainer} >
      <div className={styles.articles}>
        {articles.length > 0 ? articles.map(articles => (
          <Article key={articles._id} {...articles} />
        )) : <div>Няма статии</div>}
      </div>
    </div>
  );
}