const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const messageService = require('../services/messageService')
const { parseError } = require('../utils/errorUtil')


router.post('/createMessage', isAuth, async (req, res) => {
    const data = req.body
    try {
        const comment = await messageService.create(data)
        res.json(comment)
    }catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getMessages/:id', async (req, res) => {
    const id = req.params.id
    try {
        const msg = await messageService.getById(id)
        res.json(msg)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/deleteMessage/:id', async (req, res) => {
    const id = req.params.id
    try {
        await messageService.del(id)
        res.json({ message: 'DELETED' })
    }catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
module.exports = router