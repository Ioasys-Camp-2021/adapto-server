const router = require('express').Router()
const { refugeeController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', refugeeController.create)
router.get('/', refugeeController.list)
router.get('/:userId', refugeeController.get)
router.put('/', isAuthenticated, refugeeController.update)
router.delete('/', isAuthenticated, refugeeController.delete)

module.exports.refugee = router
