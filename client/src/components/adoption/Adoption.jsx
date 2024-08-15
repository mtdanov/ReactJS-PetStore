import { useEffect, useState } from "react";

import Post from "./post/Post";
import * as postService from '../../services/postService'
import Preloader from '../preloader/Preloader';


import styles from './Adoption.module.css'

export default function Adoption() {
    const [animals, setAnimals] = useState([]);
    const [isloading, setloading] = useState(false)


    useEffect(() => {
        postService.getAllPosts().then(result => {
            setAnimals(result)
            setloading(true)
        }
        ).catch(error => console.log(error))
    }, [])

    return (
        <>
            {!isloading ? <Preloader /> :
                <div className={styles.adoption}>
                    <section className={styles.animals}>
                        {animals.length > 0 ? animals.map((animal) => (
                            <Post key={animal._id} {...animal} />
                        )) : <div>Няма постове</div>}
                    </section>
                </div >
            }
        </>

    )
}