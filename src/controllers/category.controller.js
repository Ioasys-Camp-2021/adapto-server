const { StatusCodes } = require('http-status-codes')
const { userService } = require('../services')

module.exports = {
  create: async (req, res) => {
    try {
      const response = await userService.create(req.user.role, req.body)
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
  },
  list: async (req, res) => {
    try {
      const response = await userService.list(req.query)

      if (!response || response.data.length === 0) {
        return res.status(StatusCodes.NO_CONTENT).end()
      }

      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  },
  get: async (req, res) => {
    try {
      const response = await userService.get(req.params.id)
      return res.status(StatusCodes.OK).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  },
  delete: async (req, res) => {
    try {
      const response = await userService.deleteOne(req.user.role, req.params.id)
      return res.status(StatusCodes.NO_CONTENT).json(response)
    } catch (error) {
      console.error(error)
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message)
    }
  }
}
