const router = require('express').Router()
const { isAuth, authRole } = require('../middlewares/authMiddleware')
const articleService = require('../services/articleService')

router.get('/', async (req, res) => {
    try {
        const articles = await articleService.getAll()
        res.json(articles)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/article/:id', async (req, res) => {
    try {
        const id = req.params.id
        const article = await articleService.getById(id)
        res.json(article)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/articleEdit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const article = await articleService.getByIdEdit(id)
        res.json(article)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/latestArticles', async (req, res) => {
    try {
        const articles = await articleService.getLatest()
        res.json(articles)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.delete('/deleteArticle/:id', async (req, res) => {
    try {
        const id = req.params.id
        await articleService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})


module.exports = router