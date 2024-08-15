import { useEffect, useState } from "react"

import * as commentService from '../../../services/commentService'

import styles from './EditComment.module.css'

export default function EditComment({ editNewComment, commentEditModalID, closeCommentsEditModalHandler, type }) {
    const [comment, setComment] = useState([]);

    const commentEditHandler = (e) => {
        setComment({ ...comment, comment: e.target.value });
    }

    const setEditHandler = (e) => {
        e.preventDefault();
        editNewComment(comment);
    }

    useEffect(() => {
        commentService.getComment(commentEditModalID, type)
            .then(result => setComment(result))
            .catch(error => console.log(error));
    }, [commentEditModalID]);

    return (
        <div className={styles.editContainer}>
            <form className={styles.editFormComment}>
                <textarea className={styles.editComment}
                    placeholder="Enter your text here"
                    rows="10"
                    cols="30"
                    name="comment"
                    onChange={commentEditHandler}
                    value={comment.comment}
                />
                <button className={styles.sendBtn} onClick={setEditHandler}>Send</button>
            </form>
            <button className={styles.close} onClick={closeCommentsEditModalHandler}>x</button>
        </div>
    )
} 