const router = require('express').Router()
const { userController } = require('../controllers')
const { isAuthenticated, sendEmail } = require('../middlewares')

router.post('/', userController.createTest)
router.get('/', isAuthenticated, userController.list)
router.get('/:id', userController.get)
router.put('/', isAuthenticated, userController.update)
router.patch('/', isAuthenticated, sendEmail)
router.delete('/', isAuthenticated, userController.delete)

module.exports.user = router
