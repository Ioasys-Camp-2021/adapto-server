const router = require('express').Router()
const { jobController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', isAuthenticated, jobController.create)
router.get('/:id', jobController.get)

module.exports.job = router
