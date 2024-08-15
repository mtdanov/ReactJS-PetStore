const router = require('express').Router()
const contactUsService = require('../services/contactUsService')
const { parseError } = require('../utils/errorUtil')

router.post('/createContact', async (req, res) => {
    try {
        const data = req.body
        const result = await contactUsService.create(data)
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getContact', async (req, res) => {
    try {
        const result = await contactUsService.getAll()
        res.json(result)
    }catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

module.exports = router