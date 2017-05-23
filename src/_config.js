const config = {}

config.postgresURI = {
  development: 'postgres://postgres:postgres@localhost:5432/api_development',
  test: 'postgres://postgres:postgres@localhost:5432/api_test',
  production: process.env['DATABASE_URL']
}

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
}

export default config
