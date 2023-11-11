const sequelize = require('sequelize')

const Cadastros = require('../models/cadastros')

module.exports = {
  async buscarTodos(req, res) {
    try {
      const cadastros = await Cadastros.findAll()

      if (cadastros.length > 0) {
        res.status(200).send({ cadastros: [...cadastros] })
        return
      }

      res.status(204).send({ message: 'Nenhum cadastro foi encontrado' })

    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async buscarPorCodigo(req, res) {
    const { codigo } = req.params
    try {
      const cadastro = await Cadastros.findOne({ where: { codigo: codigo } })

      if (cadastro) {
        res.status(200).send(cadastro)
      } else {
        res.status(204).send({ message: 'O código informado não foi encontrado no cadastro' })
      }

    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async criarNovo(req, res) {
    try {

      const novoCadastro = {
        cpfcnpj: req.body.cpfcnpj,
        nome: req.body.nome,
        endereco: req.body.endereco,
        numero: req.body.numero,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        complemento: req.body.complemento,
        telefone: req.body.telefone
      }

      const cadastroExiste = await Cadastros.findOne({ where: { cpfcnpj: novoCadastro.cpfcnpj } })

      if (cadastroExiste) {
        res.status(400).send({ message: 'O CPF/CNPJ informado já está cadastrado na base de dados' })
      } else {
        const cadastroSalvo = await Cadastros.create(novoCadastro)
        res.status(201).send(cadastroSalvo)
      }


    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async atualizarCadastro(req, res) {
    const { codigo } = req.params
    try {

      const cadastro = {
        cpfcnpj: req.body.cpfcnpj,
        nome: req.body.nome,
        endereco: req.body.endereco,
        numero: req.body.numero,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        complemento: req.body.complemento,
        telefone: req.body.telefone
      }

      const cadastroExiste = await Cadastros.findOne({ where: { codigo: codigo } })

      if (cadastroExiste) {

        const cadastroAtualizado = await Cadastros.update(cadastro, { where: { codigo: codigo } })

        res.status(200).send(cadastro)

      } else {
        res.status(400).send({ message: 'O Cadastro informado não existe na base de dados' })
      }


    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async excluirCadastro(req, res) {
    const { codigo } = req.params
    try {
      const cadastroExiste = await Cadastros.findByPk(codigo)

      if (cadastroExiste) {

        await Cadastros.destroy({
          where: { codigo: codigo }
        })

        res.status(204).send({ message: 'Cadastro Deletado com Sucesso' })
      } else {
        res.status(400).send({ message: 'Cadastro não encontrado na base de dados' })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }
}