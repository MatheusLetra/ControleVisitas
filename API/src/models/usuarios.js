const Sequelize = require('sequelize')
const conexao = require('../config/conexao')

const Usuarios = conexao.define('usuarios', {
  codigo_cadastro: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  login: { type: Sequelize.STRING(100) },
  senha: { type: Sequelize.STRING(100) }
}, { freezeTableName: true })

module.exports = Usuarios
