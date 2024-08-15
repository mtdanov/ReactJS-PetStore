import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import AuthContext from '../../../contexts/authContext';
import AdoptionContact from '../adoption-contact/AdoptionContact';
import * as postService from '../../../services/postService'

import styles from './AdoptionDetails.module.css'
import useDelete from '../../../hooks/useDelete';

export default function AdoptionDetails() {
    const { userId } = useContext(AuthContext)
    const { animalId } = useParams()
    
    const [animal, setAnimal] = useState({});

    const [commentModal, setCommentModal] = useState(false);

    const [commentModalID, setCommentModalID] = useState('');
    
    const { onDelete } = useDelete()
    

    const commentModalHandler = (e, id) => {
        setCommentModal(state => !state);
        setCommentModalID(id);
    }

    const onClose = (e) => {
        setCommentModal(false)
    }

    useEffect(() => {
        postService.getPost(animalId).then(result => setAnimal(result)).catch(err => console.log(err))
    }, [animalId])
    return (
        <section className={styles.adoptionDetailsPage}>
            <div className={styles.adoptionDetails} >
                <div className={styles.animalDetails}>
                    <img className={styles.animalDetailsPic} src={animal.file} alt="" />
                    <p className={styles.animalDetailsName}>Име: {animal.name}</p>
                    <p className={styles.animalDetailsBreed}>Порода: {animal.breed}</p>
                    <p className={styles.animalDetailsAge}>Години: {animal.age}</p>
                    <p className={styles.animalDetailsDescription}>Описание: {animal.description}</p>
                    {commentModal && <AdoptionContact owner={animal.owner} onClose={onClose} />}
                    {userId !== animal.owner ?
                        <button className={styles.animalDetailsBtn} onClick={(e) => commentModalHandler(e, animal._id)}>Проявявам интерес</button> : <></>}
                </div>
                {userId === animal.owner ? <div className={styles.userBtns}>
                    <Link className={styles.editBtn} to={`/edit-post/${animal._id}`}>Edit</Link>
                    <button className={styles.deleteBtn} onClick={() => onDelete(animal._id, 'post')}>Delete</button>
                </div> : <></>}
            </div >
        </section>

    )
}