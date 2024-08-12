const router = require('express').Router()
const { isGuest } = require('../middlewares/authMiddleware')
const postService = require('../services/postService')

router.get('/', async (req, res) => {
    try {
        const posts = await postService.getAll()
        res.json(posts)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/animal/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await postService.getById(id)
        res.json(post)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/animalEdit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await postService.getByIdEdit(id)
        res.json(post)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.delete('/deletePost', async (req, res) => {
    try {
        const id = req.body.id
        await postService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})


module.exports = router