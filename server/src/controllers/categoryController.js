const router = require('express').Router()
const categoryService = require('../services/categoryService')

router.post('/createCategory', async (req, res) => {
    try {
        const name = req.body

        await categoryService.create(name)
        res.json({ message: 'Created Successfully' })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/getCategories', async (req, res) => {
    try {
        const result = await categoryService.getCategories()
        res.json(result)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})


// router.get('')

module.exports = router