const Sequelize = require('sequelize')
const conexao = require('../config/conexao')

const Cadastros = require('./cadastros')
const Usuarios = require('./usuarios')

const Visitas = conexao.define('visitas', {
  codigo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  codigo_visitante: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  codigo_agendador: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  motivo_visita: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },
  data_visita: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  status: {
    type: Sequelize.CHAR(1),
    allowNull: false
  }
}, { freezeTableName: true })

Cadastros.hasMany(Visitas, { foreignKey: 'codigo_visitante'})
Visitas.belongsTo(Cadastros, { foreignKey: 'codigo_visitante' })

Usuarios.hasMany(Visitas, { foreignKey: 'codigo_agendador'})
Visitas.belongsTo(Usuarios, { foreignKey: 'codigo_agendador' })


module.exports = Visitas