const { StatusCodes } = require('http-status-codes')
const { authService } = require('../services')

module.exports = {
  login: async (req, res) => {
    try {
      const response = await authService.login(req.body)
      return res.status(StatusCodes.OK).json(response)
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
