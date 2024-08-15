import './ShowOrder.css'

export default function ShowOrder({ file, name, price, quantity }) {
    return (
        <div className="order-product">
            <img className='order-pic' src={file} alt="" />
            <div className='description-order'>
                <p className='order-name'>продукт: {name}</p>
                <p className='order-price'>цена: {price}</p>
                <p className='order-quantity'>количесво: {quantity}</p>
            </div>
        </div>
    )
}