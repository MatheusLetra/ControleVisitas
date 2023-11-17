const Cadastros = require('../models/cadastros')
const Usuarios = require('../models/usuarios')

const { criptografarSenha } = require('../utils/seguranca')


module.exports = {
  async buscarTodos(req, res) {
    try {
      const usuarios = await Usuarios.findAll({
        include: [
          { model: Cadastros, required: true }
        ]
      })

      if (usuarios.length > 0) {
        res.status(200).send({ usuarios: [...usuarios] })
        return
      }

      res.status(204).send({ message: 'Nenhum usuario foi encontrado' })

    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async buscarPorCodigo(req, res) {
    const { codigo } = req.params
    try {
      const usuario = await Usuarios.findOne({
        where: { codigo_cadastro: codigo }, include: [
          { model: Cadastros, required: true }
        ]
      })

      if (usuario) {
        res.status(200).send(usuario)
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

        const { codigo } = cadastroSalvo

        const novoUsuario = {
          codigo_cadastro: codigo,
          login: req.body.login,
          senha: await criptografarSenha(req.body.senha)
        }

        await Usuarios.create(novoUsuario)

        res.status(201).send(cadastroSalvo)
      }


    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async atualizarUsuario(req, res) {
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

        await Cadastros.update(cadastro, { where: { codigo: codigo } })

        const usuarioAtualizado = {
          codigo_cadastro: codigo,
          login: req.body.login,
          senha: await criptografarSenha(req.body.senha)
        }

        await Usuarios.update(usuarioAtualizado, { where: { codigo_cadastro: codigo } })

        res.status(200).send(cadastro)

      } else {
        res.status(400).send({ message: 'O Cadastro informado não existe na base de dados' })
      }


    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  async excluirUsuario(req, res) {
    const { codigo } = req.params
    try {
      const cadastroExiste = await Cadastros.findByPk(codigo)

      if (cadastroExiste) {

        await Cadastros.destroy({
          where: { codigo: codigo }
        })

        res.status(204).send({ message: 'Usuário Deletado com Sucesso' })
      } else {
        res.status(400).send({ message: 'Usuário não encontrado na base de dados' })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }
}