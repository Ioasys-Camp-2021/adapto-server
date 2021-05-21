const router = require('express').Router()
const { refugeeController } = require('../controllers')

router.post('/', refugeeController.create)

module.exports.refugee = router
