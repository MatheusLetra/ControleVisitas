const Cadastros = require('../models/cadastros')
const Usuarios = require('../models/usuarios')
const Visitas = require('../models/visitas')
const moment = require('moment')

module.exports = {
  async buscarTodas(req, res) {
    try {
      const visitas = await Visitas.findAll({
        include: [
          { model: Cadastros, required: true }
        ]
      })

      if (visitas.length > 0) {
        res.status(200).send({ visitas: [...visitas] })
        return
      }

      res.status(204).send({ message: 'Nenhuma visita foi encontrada' })

    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async buscarPorCodigo(req, res) {
    const { codigo } = req.params
    try {
      const visita = await Visitas.findOne({
        where: { codigo: codigo },
        include: [
          { model: Cadastros, required: true }
        ]
      })

      if (visita) {
        res.status(200).send(visita)
      } else {
        res.status(204).send({ message: 'O código informado não foi encontrado na relação de visitas' })
      }

    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async criarNova(req, res) {
    try {

      const novaVisita = {
        codigo_visitante: req.body.codigo_visitante,
        codigo_agendador: req.body.codigo_agendador,
        motivo_visita: req.body.motivo_visita,
        data_visita: moment(req.body.data_visita, "MM-DD-YYYY"),
        status: req.body.status
      }

      const visitanteExiste = await Cadastros.findOne({ where: { codigo: novaVisita.codigo_visitante } })

      if (visitanteExiste) {

        const agendadorExiste = await Usuarios.findOne({ where: { codigo_cadastro: novaVisita.codigo_agendador } })

        if (agendadorExiste) {

          const visitaSalva = await Visitas.create(novaVisita)
          res.status(201).send(visitaSalva)

        } else {

          res.status(400).send({ message: 'O agendador informado não existe na base de dados' })

        }
      } else {

        res.status(400).send({ message: 'O visitante informado não existe na base de dados' })

      }

    } catch (error) {
      console.log(error)
      res.status(500).send({ message: error })
    }
  },
  async atualizarVisita(req, res) {
    const { codigo } = req.params
    try {

      const visitaExiste = await Visitas.findByPk(codigo)

      if (visitaExiste) {
        const visitaAlterada = {
          codigo_visitante: req.body.codigo_visitante,
          codigo_agendador: req.body.codigo_agendador,
          motivo_visita: req.body.motivo_visita,
          data_visita: moment(req.body.data_visita, "MM-DD-YYYY"),
          status: req.body.status
        }

        const visitanteExiste = await Cadastros.findOne({ where: { codigo: visitaAlterada.codigo_visitante } })

        if (visitanteExiste) {

          const agendadorExiste = await Usuarios.findOne({ where: { codigo_cadastro: visitaAlterada.codigo_agendador } })

          if (agendadorExiste) {

            const visitaSalva = await Visitas.update(visitaAlterada, { where: { codigo: codigo } })
            res.status(204).send(visitaSalva)

          } else {

            res.status(400).send({ message: 'O agendador informado não existe na base de dados' })

          }
        } else {

          res.status(400).send({ message: 'O visitante informado não existe na base de dados' })

        }

      } else {

        res.status(400).send({ message: 'A visita informada não existe na base de dados' })

      }

    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async excluirVisita(req, res) {
    const { codigo } = req.params
    try {
      const visitaExiste = await Visitas.findByPk(codigo)

      if (visitaExiste) {

        await Visitas.destroy({
          where: { codigo: codigo }
        })

        res.status(204).send({ message: 'Visita Deletada com Sucesso' })
      } else {
        res.status(400).send({ message: 'Visita não encontrada na base de dados' })
      }
    } catch (error) {
      res.status(500).send({ message: error })
    }
  }
}