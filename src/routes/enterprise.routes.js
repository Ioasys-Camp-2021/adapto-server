const router = require('express').Router()
const { enterpriseController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', enterpriseController.create)
router.get('/', isAuthenticated, enterpriseController.list)
router.get('/:id', enterpriseController.get)
router.put('/', isAuthenticated, enterpriseController.update)
router.delete('/', isAuthenticated, enterpriseController.delete)

module.exports.enterprise = router