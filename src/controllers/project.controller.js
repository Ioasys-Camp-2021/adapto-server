const { StatusCodes } = require('http-status-codes')
const { projectService } = require('../services')
const { messages } = require('../utils')

module.exports = {
  create: async (req, res) => {
    try {
      if (req.session.role !== 1) {
        throw Object.assign(new Error(messages.accessUnauthorized), {
          status: StatusCodes.FORBIDDEN
        })
      }
      const response = await projectService.create(req.user.id, req.body)
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
