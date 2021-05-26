const router = require('express').Router()
const { categoryController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.all(isAuthenticated)
router.post('/', categoryController.create)
router.get('/', categoryController.list)
router.get('/:id', categoryController.get)
router.delete('/', categoryController.delete)

module.exports.refugee = router
