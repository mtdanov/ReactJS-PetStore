import { Link } from 'react-router-dom'

import dog_food from '../../../public/images/dog-food.png'
import dog_toy from '../../../public/images/dog-toy.png'
import dog_treat from '../../../public/images/dog-treat.png'


import Path from '../../path'
import styles from './DogCategory.module.css'

export default function DogCategory() {
    return (
        <div className={styles.dogCategory}>
            <div className={styles.dogCategories}>
                <Link to={Path.DogFood}>
                    <div className={styles.dogContainers}>
                        <h2 className={styles.dogHeader}>Храна</h2>
                        <img className={styles.dogCategoriesPic} src={dog_food} alt="" />
                    </div>
                </Link>
                <Link to={Path.DogTreats}>
                    <div className={styles.dogContainers}>
                        <h2 className={styles.dogHeader}>Лакомства</h2>
                        <img className={styles.dogCategoriesPic} src={dog_treat} alt="" />
                    </div>
                </Link>
                <Link to={Path.DogToys}>
                    <div className={styles.dogContainers}>
                        <h2 className={styles.dogHeader}>Играчки</h2>
                        <img className={styles.dogCategoriesPic} src={dog_toy} alt="" />
                    </div>
                </Link>

            </div>
        </div>
    )
}