const { StatusCodes } = require('http-status-codes')
const { userService } = require('../services')

module.exports = {
  createTest: async (req, res) => {
    try {
      const response = await userService.createUser(req.body, 3)
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
