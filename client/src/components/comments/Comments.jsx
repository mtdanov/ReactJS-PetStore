import { useEffect, useState } from 'react'

import useForm from '../../hooks/useForm'
import { useValidation } from '../../hooks/useValidation'
import * as commentService from '../../services/commentService'
import EditComment from './edit-comments/EditComment'
import DeleteModal from '../delete-modal/DeleteModal'

import styles from './Comments.module.css'

const initialState = {
    comment: '',
}

export default function Comments({ id, username, type }) {
    const [comments, setComments] = useState([]);
    const [validateForm, errors] = useValidation()

    const [commentEditModal, setCommentEditModal] = useState(false);
    const [commentEditModalID, setCommentEditModalID] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState('');


    const commentEditModalHandler = (e, id) => {
        setCommentEditModal(state => !state);
        setCommentEditModalID(id);
    }

    const closeCommentsEditModalHandler = (e) => {
        setCommentEditModal(false)
    }

    const editNewComment = async (comment) => {
        await commentService.editComment(comment)
            .then((result) => {
                let nc = comments.map((item) => {
                    if (item._id === result._id) {
                        return { ...item, comment: result.comment };
                    }
                    return item;
                })
                setComments(nc);
            })
            .catch(error => console.log(error));
        setCommentEditModal(false);
    }


    const handleShowModal = (commentId) => {
        setSelectedCommentId(commentId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCommentId('');
    };

    const handleDelete = async (id) => {
        try {
            await commentService.delComment(id)
            setComments(state => state.filter((c) => c._id !== id))
        } catch (err) {
            console.log(err);
        }
        setShowModal(false);
    }


    function dateTransform(date) {
        const dateToTransform = new Date(date);
        const formattedDate = dateToTransform.toLocaleString();
        return formattedDate
    }

    useEffect(() => {
        commentService.getAll(id, type)
            .then(result => setComments(result))
            .catch(error => console.log(error));
    }, [id]);

    const { data, onChange, onSubmit } = useForm(initialState, async ({ comment }) => {

        try {
            if (validateForm('comment', comment)) {
                const result = await commentService.createComment(id, username, comment, type)
                console.log(result);

                setComments(state => [...state, result])
            }

        } catch (err) {
            console.log(err)
        }
    });

    return (
        <section className={styles.comments}>
            {commentEditModal && <EditComment editNewComment={editNewComment} commentEditModalID={commentEditModalID} closeCommentsEditModalHandler={closeCommentsEditModalHandler} type={type} />}
            <div className={styles.articleComments}>
                <h2 className={styles.comments}>Коментари:</h2>
                {comments.length > 0 ? comments.map((c) => (
                    <li key={c._id}>
                        <p>{c.username}: {c.comment}</p>
                        <p>{dateTransform(c.createdAt)}</p>
                        {username === c.username ? <div className={styles.commentOwnerBtns}>
                            <button className={styles.ownerEditBtn} onClick={(e) => commentEditModalHandler(e, c._id)}>Редактирай</button>
                            <button className={styles.ownerDeleteBtn} onClick={() => handleShowModal(c._id)}>Изтрий</button>
                        </div> : <></>}
                    </li>
                )) : <div className={styles.noComments}>Няма коментари</div>}
            </div>
            {showModal && < DeleteModal
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDelete}
                commentId={selectedCommentId}
            />}
            <article className={styles.createComment}>
                <label className={styles.commentLabel}>Напиши коментар:</label>
                <form className={styles.form} onSubmit={onSubmit} >
                    <textarea className={styles.textarea} value={data.comment} onChange={onChange} name="comment" placeholder="Коментар......"></textarea>
                    <input className={styles.commentBtn} type="submit" value="Добави Коментар" />
                    {errors.comment && <span className={styles.error}>{errors.comment}</span>}

                </form>
            </article>
        </section>
    )
}
