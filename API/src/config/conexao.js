const { Sequelize } = require('sequelize')
const { bancodados } = require('./bancodados')

const sequelize = new Sequelize(bancodados.database,
  bancodados.username, bancodados.password,
  {
    host: bancodados.host,
    dialect: bancodados.dialect,
    timezone: '-03:00',
    define: {
      timestamps: false
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  })

module.exports = sequelize