const router = require('express').Router()
const { userController } = require('../controllers')

router.post('/', userController.createTest)

module.exports.user = router
