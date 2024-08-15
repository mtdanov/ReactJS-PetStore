const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const commentService = require('../services/commentService')
const { parseError } = require('../utils/errorUtil')


router.post('/:type/create/:typeId', async (req, res) => {
    const id = req.params.typeId
    const type = req.params.type
    const data = req.body
    data.parent = id
    try {
        const comment = await commentService.create(type, data, id)
        res.json(comment)
    }  catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
router.get('/:type/getComments/:articleId', async (req, res) => {
    const id = req.params.articleId
    const type = req.params.type
    try {
        const comments = await commentService.getComments(type, id)
        res.json(comments)
    }  catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.get('/getComment/:commentId', async (req, res) => {
    try {
        const id = req.params.commentId
        const c = await commentService.getComment(id)
        const _id = c._id
        const comment = c.comment
        res.json({ comment, _id })
    }  catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})

router.delete('/deleteComment/:commentId', async (req, res) => {
    try {
        const id = req.params.commentId
        await commentService.del(id)
        res.json('DELETED')
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

})

router.put('/editComment', async (req, res) => {
    const id = req.body._id
    const comment = req.body.comment
    try {
        const editedComment = await commentService.editComment(id, comment)
        res.json(editedComment)
    }  catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
})
module.exports = router