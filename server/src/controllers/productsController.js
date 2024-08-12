const router = require('express').Router()
const productService = require('../services/productService')

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
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/getCategory', async (req, res) => {
    const { category } = req.query
    try {
        const products = await productService.getFood(category)
        res.json(products)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll()
        res.json(products)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/productEdit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await productService.getByIdEdit(id)
        res.json(product)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/product/:id', async (req, res) => {

    try {
        const id = req.params.id
        const product = await productService.getById(id)
        console.log(product);
        res.json(product)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/productEdit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await productService.getByIdEdit(id)

        res.json(product)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})


router.get('/latestProducts', async (req, res) => {
    try {
        const products = await productService.getLatest()
        res.json(products)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const id = req.params.id
        await productService.del(id)
        res.json({ message: 'DELETED' })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

module.exports = router