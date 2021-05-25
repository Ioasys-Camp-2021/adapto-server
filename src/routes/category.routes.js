const router = require('express').Router()
const { refugeeController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.all(isAuthenticated)
router.post('/', refugeeController.create)
router.get('/', refugeeController.list)
router.get('/:id', refugeeController.get)
router.put('/', refugeeController.update)
router.delete('/', refugeeController.delete)

module.exports.refugee = router
