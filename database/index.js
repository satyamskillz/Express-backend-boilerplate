const knexfile = require('../knexfile')
const logger = require('../logger')
const knex = require('knex')


const env = process.env.NODE_ENV || "development"
const config = knexfile[env]

logger.info(`Connection Established at ${env}`);

module.exports = knex(config)