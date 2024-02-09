const sequelize = require('sequelize')

const Cadastros = require('../models/cadastros')
const Usuarios = require('../models/usuarios')
const Visitas = require('../models/visitas')

module.exports = {
  async buscarDados(req, res) {
    try {
      const cadastros = await Cadastros.count()
      const usuarios = await Usuarios.count()
      const visitas = await Visitas.count()

      res.status(200).send({ cadastros, usuarios, visitas })


    } catch (error) {
      res.status(500).send({ message: error })
    }
  }
}