const router = require('express').Router()
const productService = require('../services/productService')
const cloudinary = require('../config/couldinaryConfig')
const { upload } = require('../config/multer.Config')
const { parseError } = require('../utils/errorUtil')



router.post('/create', upload.single('file'), async (req, res) => {
    try {
        const { name, description, category, type, file, price, totalPrice } = req.body;
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;

        }
        const product = await productService.create({ name, description, category, type, file, price, totalPrice, file: imageUrl })
        res.json(product)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

router.put('/editProduct/:id', upload.single('file'), async (req, res) => {
    try {
        console.log('dasdas')
        const id = req.params.id;
        const { name, description, category, type, file, price, } = req.body;
        let imageUrl = '';
        if (req.body.fileUrl) {
            imageUrl = req.body.fileUrl
        } else if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const result = await productService.editProduct(id, { name, description, category, type, file, price, file: imageUrl })
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.get('/filteredProducts', async (req, res) => {
    const dogFood = []
    const dogToys = []
    const dogTreats = []
    const catFood = []
    const catToys = []
    const catTreats = []
    try {
        const products = await productService.getAll()
        products.forEach((product) => {
            if (product.category === 'dog-food') {
                dogFood.push(product)
            } else if (product.category === 'dog-toys') {
                dogToys.push(product)
            } else if (product.category === 'dog-treats') {
                dogTreats.push(product)
            } else if (product.category === 'cat-food') {
                catFood.push(product)
            } else if (product.category === 'cat-toys') {
                catToys.push(product)
            } else if (product.category === 'cat-treats') {
                catTreats.push(product)
            }
        })
        res.json({ dogFood, dogToys, dogTreats, catFood, catToys, catTreats })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/getCategory', async (req, res) => {
    const { category } = req.query
    try {
        const products = await productService.getFood(category)
        res.json(products)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll()
        res.json(products)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/productEdit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await productService.getByIdEdit(id)
        res.json(product)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/product/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await productService.getById(id)
        res.json(product)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/productEdit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await productService.getByIdEdit(id)
        res.json(product)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})


router.get('/latestProducts', async (req, res) => {
    try {
        const products = await productService.getLatest()
        res.json(products)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/deleteProduct/:id', async (req, res) => {
    const id = req.params.id
    try {
        await productService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
module.exports = router