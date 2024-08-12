const router = require('express').Router()
const userService = require('../services/userService')


router.post("/register", async (req, res) => {
    const userData = req.body;
    try {
        const result = await userService.register(userData);
        // console.log(result);
        // const { token, email, role, id, name } = result
        // return
        res.status(200).json(result);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login({ email, password });
        res.status(200).json(result);
    } catch ({ message }) {
        console.log(message);
        
        res.status(400).json({ message });
    }
});
router.get("/logout", (req, res) => {
    try {
        res.clearCookie('auth');
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        const errMsg = err.message;
        res.send({ message: errMsg })
    };

});

router.get('/profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await userService.getUser(id)
        res.json(user)
    } catch ({ message }) {
        res.status(400).json({ message })

    }

})

router.put('/profile/edit', async (req, res) => {
    try {
        const id = req.body.id;
        const data = req.body.data
        const user = await userService.editUser(id, data)
        res.status(200).json(user)
    } catch ({ message }) {
        res.status(400).json({ message })
    }

})


module.exports = router