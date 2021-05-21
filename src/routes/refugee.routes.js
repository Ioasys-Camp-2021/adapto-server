const router = require('express').Router()
const { refugeeController } = require('../controllers')

router.post('/', refugeeController.create)
router.get('/', refugeeController.list)
router.get('/:id', refugeeController.get)
router.put('/:id', refugeeController.update)
router.delete('/:id', refugeeController.delete)

module.exports.refugee = router
