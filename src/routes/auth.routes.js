const router = require('express').Router()
const { authController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/login', authController.login)
router.post('/logout', isAuthenticated, authController.logout)
router.get('/', isAuthenticated, (req, res) => {
  return res.json(req.user)
})

module.exports.auth = router
