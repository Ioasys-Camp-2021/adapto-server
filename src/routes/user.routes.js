const router = require('express').Router()
const { userController } = require('../controllers')

router.post('/', userController.createTest)
router.get('/', userController.list)
router.get('/:id', userController.get)
router.put('/:id', userController.update)

module.exports.user = router
