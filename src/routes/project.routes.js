const router = require('express').Router()
const { projectController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', isAuthenticated, projectController.create)

module.exports.project = router
