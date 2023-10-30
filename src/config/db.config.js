const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_ROOT_PASSWORD
)

module.exports = { DB }
