import { useEffect, useState } from "react";

import home_pic from '../../../public/images/home.jpg'

import Product from "../Product/Product";
import Article from "../blog/article/Article";
import * as productService from '../../services/productService'
import * as articleService from '../../services/articleService'

import styles from "./Home.module.css";


export default function Home() {
  const [latestProducts, setLatestProducts] = useState([])
  const [latestArticles, setLatestArticles] = useState([])

  useEffect(() => {
    productService.getLatestProducts().then(result => setLatestProducts(result)).catch(error => console.log(error))
  }, [])
  useEffect(() => {
    articleService.getLatestArticles().then(result => setLatestArticles(result)).catch(error => console.log(error))
  }, [])

  return (
    <>
      <div className={styles.home}>
        <div className={styles.homeText}>
          <h2 className={styles.homeTitle}>Добре дошли в ИгмаВет</h2>
          {/* <p className={styles.homeParagraph}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel repellat obcaecati vero nesciunt quo assumenda, est earum reprehenderit odit blanditiis. Recusandae fugiat delectus eum explicabo facilis est sint alias asperiores!</p> */}
          {/* <button className={styles.homeBtn}><Link to={'/services'}></Link>Ветеринарни услуги</button> */}
        </div>

        <img className={styles.homePic} src={home_pic} alt="" />

        <h3 className={styles.lastestAdd}>Последно добавени продукти</h3>
        <div className={styles.lastestProducts}>
          {latestProducts.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </div>
        <h3 className={styles.lastestAdd}>Последно добавени статии</h3>
        <div className={styles.lastestArticles}>
          {latestArticles.map((article) => (
            <Article key={article._id} {...article} />
          ))
          }
        </div>
      </div >
    </>

  );
}
