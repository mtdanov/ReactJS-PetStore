const router = require('express').Router()
const userService = require('../services/userService')
const { parseError } = require('../utils/errorUtil')



router.post("/register", async (req, res) => {
    const userData = req.body;
    try {
        const result = await userService.register(userData);
        res.status(200).json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await userService.login({ email, password });
        res.status(200).json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});
router.get("/logout", (req, res) => {
    try {
        res.clearCookie('auth');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

});

router.get('/profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await userService.getUser(id)
        res.json(user)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})

router.put('/profile/edit', async (req, res) => {
    try {
        const id = req.body.id;
        const data = req.body.data
        const user = await userService.editUser(id, data)
        res.status(200).json(user)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})


module.exports = router