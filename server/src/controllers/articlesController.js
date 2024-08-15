const router = require('express').Router()
const cloudinary = require('../config/couldinaryConfig')
const { upload } = require('../config/multer.Config')
const { isAuth, authRole } = require('../middlewares/authMiddleware')
const articleService = require('../services/articleService')
const { parseError } = require('../utils/errorUtil')

router.post('/create', upload.single('file'), async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title)
        console.log(description)

        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        console.log(imageUrl)
        await articleService.create({ title, description, file: imageUrl })
        res.json({ message: 'CREATED' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

router.put('/editArticle/:id', upload.single('file'), async (req, res) => {
    try {
        console.log(req.body)
        const id = req.params.id;
        const { title, description } = req.body;
        let imageUrl = '';
        if (req.body.fileUrl) {
            imageUrl = req.body.fileUrl
        } else if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const result = await articleService.editArticle(id, { title, description, file: imageUrl })
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/', async (req, res) => {
    try {
        const articles = await articleService.getAll()
        res.json(articles)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/article/:id', async (req, res) => {
    const id = req.params.id
    try {
        const article = await articleService.getById(id)
        res.json(article)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/articleEdit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const article = await articleService.getByIdEdit(id)
        res.json(article)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/latestArticles', async (req, res) => {
    try {
        const articles = await articleService.getLatest()
        res.json(articles)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.delete('/deleteArticle/:id', async (req, res) => {
    const id = req.params.id
    try {
        await articleService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


module.exports = router