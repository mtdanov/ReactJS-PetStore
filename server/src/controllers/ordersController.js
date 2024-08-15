const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware');
const { parseError } = require('../utils/errorUtil')
const orderService = require('../services/orderService')

router.post('/create/:userId', isAuth, async (req, res) => {
    const data = req.body
    const userId = req.params.userId
    try {
        const order = orderService.create(data, userId)
        res.json(order)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/orders/:userId', isAuth, async (req, res) => {
    const id = req.params.userId
    try {
        const orders = await orderService.getOrders(id)
        res.json(orders)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getOrder/:orderId', isAuth, async (req, res) => {
    const id = req.params.orderId
    try {
        const result = await orderService.getOrder(id)
        console.log(result);

        const { order } = result
        res.json({ order })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

module.exports = router