import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


import * as orderService from '../../../services/orderService'
import ShowOrder from "../show-order/ShowOrder"

export default function Order() {
    const { orderId } = useParams()
    const [data, setData] = useState([])


    useEffect(() => {
        orderService.getOrder(orderId).then(result => setData(result.order)).catch(error => console.log(error))
    }, [orderId])

    return (
        <div className="order">
            {data.map((p, index) => (
                <ShowOrder key={index} {...p} />
            ))}
        </div>
    )
}