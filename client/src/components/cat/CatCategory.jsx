import { Link } from 'react-router-dom'

import cat_food from '../../../public/images/cat-food.png'
import cat_toy from '../../../public/images/cat-toy.png'
import cat_treat from '../../../public/images/cat-treat.png'

import styles from './CatCategory.module.css'
import Path from '../../path'



export default function CatCategory() {
    return (
        <div className={styles.catCategory}>
            <div className={styles.catCategories}>
                <Link to={Path.CatFood}>
                    <div className={styles.catContainers}>
                        <h2 className={styles.catHeader}>Храна</h2>
                        <img className={styles.catCategoriesPic} src={cat_food} alt="" />
                    </div>
                </Link>
                <Link to={Path.CatTreats}>
                    <div className={styles.catContainers}>
                        <h2 className={styles.catHeader}>Лакомства</h2>
                        <img className={styles.catCategoriesPic} src={cat_treat} alt="" />
                    </div>
                </Link>
                <Link to={Path.CatToys}>
                    <div className={styles.catContainers}>
                        <h2 className={styles.catHeader}>Играчки</h2>
                        <img className={styles.catCategoriesPic} src={cat_toy} alt="" />
                    </div>
                </Link>

            </div>
        </div >
    )
}