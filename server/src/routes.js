const router = require('express').Router();

const userContoller = require('./controllers/userController')
const articlesContoller = require('./controllers/articlesController')
const productsController = require('./controllers/productsController')
const messageController = require('./controllers/messageController')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')
const ordersController = require('./controllers/ordersController')
const contactUsContoller = require('./controllers/contactUsController')
const categoryContoller = require('./controllers/categoryController')

router.use('/user', userContoller);
router.use('/articles', articlesContoller)
router.use('/products', productsController)
router.use('/message', messageController)
router.use('/animals', postController)
router.use('/comment', commentController)
router.use('/order', ordersController)
router.use('/contactUs', contactUsContoller)
router.use('/category', categoryContoller)

module.exports = router