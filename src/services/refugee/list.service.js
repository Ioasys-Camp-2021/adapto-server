const { refugeesRepository } = require('../../repositories')

module.exports.list = async (query) => {
  const { count, rows } = await refugeesRepository.list({
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'UserId'] },
    where: query
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
