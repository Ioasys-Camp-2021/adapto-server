const router = require('express').Router()
const multer = require('multer')
const multerConfig = require('../config/multer')
const { imageController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.get('/:id', imageController.get)
router.post('/', multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file)
  return res.json('aa')
})
router.delete('/:id', isAuthenticated, imageController.delete)

module.exports.file = router
