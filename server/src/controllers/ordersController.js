const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware');
const Order = require('../model/Order');
const User = require('../model/User');
const orderService = require('../services/orderService')

router.post('/create/:userId', isAuth, async (req, res) => {
    try {
        const data = req.body
        const userId = req.params.userId
        const order = orderService.create(data, userId)
        res.json(order)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/orders/:userId', isAuth, async (req, res) => {

    try {
        const id = req.params.userId
        const orders = await orderService.getOrders(id)
        res.json(orders)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/getOrder/:orderId', isAuth, async (req, res) => {
    const id = req.params.orderId
    try {
        const result = await orderService.getOrder(id)
        const { order } = result
        res.json({order})
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

module.exports = router