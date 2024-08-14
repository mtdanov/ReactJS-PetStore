import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import AuthContext from "../../contexts/authContext"
import * as orderService from '../../services/orderService'
import styles from './Orders.module.css'

export default function Orders() {
    const { userId } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {
        orderService.getOrders(userId).then(result => setData(result)).catch(error => console.log(error))
    }, [userId])
    return (
        <div className={styles.profileOrders}>
            <h2 className={styles.ordersList}>Поръчки</h2>
            {data.length > 0 ? data.map((order) => {
                return (
                    <div key={order._id} className={styles.orderLink}><Link to={`/profile/orders/order/${order._id}`}>{order._id}</Link></div>
                )
            }) : <div className={styles.noOrders}>Нямате направени поръчки</div>}
        </div>
    )
}