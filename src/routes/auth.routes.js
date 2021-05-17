const router = require('express').Router()
const { StatusCodes } = require('http-status-codes')

router.post('/login', (req, res) => {
  try {
    res.status(StatusCodes.OK).json(req.body)
  } catch (error) {
    console.error(error)
    return res
      .status(
        error.name === 'ValidationError'
          ? StatusCodes.UNPROCESSABLE_ENTITY
          : error.status || StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(error.message)
  }
})

module.exports.auth = router
