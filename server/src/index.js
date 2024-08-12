const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');

const { auth, authRole } = require('./middlewares/authMiddleware');


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
// app.use(express.static('public'))
app.use(auth)
app.use(express.static(path.join(__dirname, 'public')));






















const postService = require('./services/postService')
const productService = require('./services/productService')
const articleService = require('./services/articleService');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

mongoose.connect('mongodb://localhost:27017/test-upload')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.put('/animal/editPost/:id', authRole('admin'), upload.single('file'), async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body
        if (req.file) {
            data.file = req.file.filename;
        }

        const result = await postService.editPost(id, data)
        res.json(result)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

app.post('/animal/create/:userId', upload.single('file'), async (req, res) => {

    try {
        const userId = req.params.userId
        const data = req.body
        const file = req.file.filename
        const createdAnimal = await postService.create({ ...data, file: file, owner: userId })
        res.json(createdAnimal)
    } catch (error) {
        const errMsg = error.message;

        res.send({ message: errMsg })
    }

})
// EDIT PRODUCT
app.put('/editProduct/:id', authRole('admin'), upload.single('file'), async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body
        if (req.file) {
            data.file = req.file.filename;
        }
        const result = await productService.editProduct(id, data)
        res.json(result)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
// EDIT ARTICLE
app.put('/editArticle/:id', authRole('admin'), upload.single('file'), async (req, res) => {

    try {
        const id = req.params.id;
        const data = req.body
        if (req.file) {
            data.file = req.file.filename;
        }
        const result = await articleService.editArticle(id, data)
        res.json(result)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

// CREAT BLOG
app.post('/create/article', authRole('admin'), upload.single('file'), async (req, res) => {
    try {
        const data = { ...req.body }
        if (req.file) {
            data.file = req.file.filename;
        }
        await articleService.create(data)
        res.json({ message: 'CREATED' })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

// CREATE PRODUCT
app.post('/product/create', authRole('admin'), upload.single('file'), async (req, res) => {

    try {
        const data = { ...req.body }
        if (req.file) {
            data.file = req.file.filename;
        }

        const product = await productService.create(data)
        res.json(product)
    } catch (error) {
        const errMsg = error.message;
        res.status(500).json({ message: errMsg });
    }
})
app.use(routes)
app.listen(3010, () => { console.log('Server is running') })
