const router = require('express').Router()
const contactUsService = require('../services/contactUsService')

router.post('/createContact', async (req, res) => {
    console.log(req.body);
    
    try {
        const data = req.body
        const result = await contactUsService.create(data)
        res.json(result)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.get('/getContact', async (req, res) => {
    try {
        const result = await contactUsService.getAll()
        res.json(result)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

module.exports = router