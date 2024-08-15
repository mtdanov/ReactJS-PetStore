const router = require('express').Router()
const categoryService = require('../services/categoryService')
const { parseError } = require('../utils/errorUtil')

router.post('/createCategory', async (req, res) => {
    const name = req.body
    try {

        await categoryService.create(name)
        res.json({ message: 'Created Successfully' })
    }  catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getCategories', async (req, res) => {
    try {
        const result = await categoryService.getCategories()
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
module.exports = router