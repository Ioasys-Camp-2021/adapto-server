const router = require('express').Router()
const { projectController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', isAuthenticated, projectController.create)
router.get('/:id', projectController.get)
router.put('/:id', isAuthenticated, projectController.update)

module.exports.project = router
