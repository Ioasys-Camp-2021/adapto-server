const { StatusCodes } = require('http-status-codes')
const { refugeeService } = require('../services')

module.exports = {
  create: async (req, res) => {
    try {
      const response = await refugeeService.create(req.body)
      return res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(
          error.name === 'ValidationError'
            ? StatusCodes.BAD_REQUEST
            : error.status || StatusCodes.INTERNAL_SERVER_ERROR
        )
        .json(error.message)
    }
  }
}
