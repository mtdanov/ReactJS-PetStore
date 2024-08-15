const router = require('express').Router()
const { isGuest } = require('../middlewares/authMiddleware')
const postService = require('../services/postService')
const cloudinary = require('../config/couldinaryConfig')
const { upload } = require('../config/multer.Config')
const { parseError } = require('../utils/errorUtil')



router.post('/create/:userId', upload.single('file'), async (req, res) => {
    try {
        const { name, breed, age, description } = req.body;
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const userId = req.params.userId
        const createdAnimal = await postService.create({ name, breed, age, description, file: imageUrl, owner: userId })
        res.json(createdAnimal)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})

router.put('/editPost/:id', upload.single('file'), async (req, res) => {
    try {
        console.log(req.body)
        const { name, breed, age, description } = req.body;
        const id = req.params.id;
        let imageUrl = '';
        if (req.body.fileUrl) {
            imageUrl = req.body.fileUrl
        } else if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const result = await postService.editPost(id, { name, breed, age, description, file: imageUrl })
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/', async (req, res) => {
    try {
        const posts = await postService.getAll()
        res.json(posts)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/animal/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await postService.getById(id)
        res.json(post)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/animalEdit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await postService.getByIdEdit(id)
        res.json(post)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/deletePost', async (req, res) => {
    const id = req.body.id
    try {
        await postService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


module.exports = router