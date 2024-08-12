const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const messageService = require('../services/messageService')

router.post('/createMessage', isAuth, async (req, res) => {
    try {
        const data = req.body
        const comment = await messageService.create(data)
        res.json(comment)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/getMessages/:id', async (req, res) => {
    const id = req.params.id

    try {
        const msg = await messageService.getById(id)
        res.json(msg)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.delete('/deleteMessage/:id',  async (req, res) => {
    try {
        const id = req.params.id
        await messageService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
module.exports = router