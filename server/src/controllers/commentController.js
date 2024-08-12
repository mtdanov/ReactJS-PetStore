const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const commentService = require('../services/commentService')

router.post('/:type/create/:typeId', async (req, res) => {
    try {
        const id = req.params.typeId
        const type = req.params.type 
        const data = req.body
        data.parent = id
        console.log(data);
        
        const comment = await commentService.create(type, data, id)
        res.json(comment)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
router.get('/:type/getComments/:articleId', async (req, res) => {

    try {
        const id = req.params.articleId
        const type = req.params.type
        const comments = await commentService.getComments(type, id)
        res.json(comments)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    } 
})

router.get('/getComment/:commentId', async (req, res) => {
    try {
        const id = req.params.commentId
        const c = await commentService.getComment(id)
        const _id = c._id
        const comment = c.comment
        res.json({ comment, _id })
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})

router.delete('/deleteComment/:commentId', async (req, res) => {
    try {
        const id = req.params.commentId
        await commentService.del(id)
        res.json('DELETED')
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }

})

router.put('/editComment', async (req, res) => {
    try {
        const id = req.body._id
        const comment = req.body.comment
        const editedComment = await commentService.editComment(id, comment)
        res.json(editedComment)
    } catch (error) {
        const errMsg = error.message;
        res.send({ message: errMsg })
    }
})
module.exports = router