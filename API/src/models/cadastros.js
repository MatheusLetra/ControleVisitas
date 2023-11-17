const Sequelize = require('sequelize')
const conexao = require('../config/conexao')

const Usuarios = require('./usuarios')

const Cadastros = conexao.define('cadastros', {
  codigo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  cpfcnpj: { type: Sequelize.STRING(18) },
  nome: { type: Sequelize.STRING(60) },
  endereco: { type: Sequelize.STRING(50) },
  numero: { type: Sequelize.STRING(10) },
  bairro: { type: Sequelize.STRING(30) },
  cep: { type: Sequelize.STRING(10) },
  cidade: { type: Sequelize.STRING(40) },
  estado: { type: Sequelize.STRING(2) },
  complemento: { type: Sequelize.STRING(50) },
  telefone: { type: Sequelize.STRING(15) }
}, { freezeTableName: true })

Cadastros.hasOne(Usuarios, { foreignKey: 'codigo_cadastro'})
Usuarios.belongsTo(Cadastros, { foreignKey: 'codigo_cadastro' })

module.exports = Cadastros
