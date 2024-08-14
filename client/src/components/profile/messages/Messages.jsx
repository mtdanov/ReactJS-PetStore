import { useContext, useEffect, useState } from 'react'

import AuthContext from '../../../contexts/authContext'
import * as adoptionContactService from '../../../services/adoptionContactService';
import Message from './message/Message';

import  styles from './Messages.module.css'


export default function Messages() {
    const { userId, } = useContext(AuthContext)
    const [message, setMessage] = useState([])

    useEffect(() => {
        adoptionContactService.getMessages(userId).then(result => setMessage(result)).catch(error => console.log(error))

    }, [userId])

    return (
        <section className={styles.messages}>
            {message.length > 0 ? message.map((m) => (
                <Message key={m._id} {...m} />
            )) : <div className={styles.noMessages}>нямате съобщения</div>}
        </section>
    )
}